// auth.service.js
const { hashPassword, comparePassword } = require('../../utils/hash');
const { generateToken } = require('../../utils/jwt');
const { generateOtp } = require('../../utils/otp');
const OtpCache = require('../../utils/otp.cache');
const AuthEmailService = require('./auth.email.service');

class AuthService {
  constructor(accountRepository, userRepository) {
    this.accountRepository = accountRepository;
    this.userRepository = userRepository;
    this.emailService = new AuthEmailService();
    this.otpCache = OtpCache.getInstance();
  }

  async register({ name, email, password, role }) {
    const existing = await this.accountRepository.findByEmail(email);
    if (existing) throw new Error('Email already registered');

    const otp = generateOtp();
    const hashed = await hashPassword(password);

    await this.otpCache.set(email, otp, {
      name,
      email,
      password: hashed,
      role: role || 'user',
    });

    await this.emailService.sendOtp({ to: email, otp });
    return { message: 'OTP sent to your email. Please verify.' };
  }

  async verifyOtp({ email, otp }) {
    const cached = await this.otpCache.get(email);
    if (!cached) throw new Error('OTP expired or not found');
    if (cached.otp !== otp) throw new Error('Invalid OTP');

    const user = await this.userRepository.create({ name: cached.name });
    const account = await this.accountRepository.create({
      email: cached.email,
      password: cached.password,
      role: cached.role,
      isVerified: true,
      user: user._id,
    });

    await this.otpCache.delete(email);

    const token = generateToken({
      _id: account._id,
      role: account.role,
      permissions: account.permissions,
    });

    return {
      token,
      message: 'Account verified and created successfully.',
      account: { email: account.email, role: account.role, isVerified: account.isVerified },
      user,
    };
  }

  async login({ email, password }) {
    const account = await this.accountRepository.findByEmail(email);
    if (!account) throw new Error('Invalid credentials');
    if (!account.isVerified) throw new Error('Please verify your email first');

    const isMatch = await comparePassword(password, account.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = generateToken({
      _id: account._id,
      role: account.role,
      permissions: account.permissions,
    });

    return {
      token,
      account: { email: account.email, role: account.role, permissions: account.permissions },
    };
  }
}

module.exports = AuthService;
