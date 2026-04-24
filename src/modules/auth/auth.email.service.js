// auth.email.service.js
const BaseEmailService = require('../../base/base.email.service');

class AuthEmailService extends BaseEmailService {
  async sendOtp({ to, otp }) {
    await this.sendMail({
      to,
      subject: 'Your OTP Code',
      html: `<h2>Your OTP is: <strong>${otp}</strong></h2><p>This OTP is valid for 10 minutes.</p>`,
    });
  }

  async sendWelcome({ to, name }) {
    await this.sendMail({
      to,
      subject: 'Welcome to AI Studio',
      html: `<h2>Hi ${name},</h2><p>Your account has been created successfully.</p>`,
    });
  }

  async sendPasswordReset({ to, resetLink }) {
    await this.sendMail({
      to,
      subject: 'Reset Your Password',
      html: `<h2>Password Reset</h2><p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });
  }
}

module.exports = AuthEmailService;
