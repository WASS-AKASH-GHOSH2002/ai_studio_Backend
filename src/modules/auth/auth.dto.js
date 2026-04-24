// auth.dto.js
const { z } = require('zod');

const registerDto = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'admin']).optional(),
});

const loginDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const verifyOtpDto = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

module.exports = { registerDto, loginDto, verifyOtpDto };
