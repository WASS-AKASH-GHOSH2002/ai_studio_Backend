// auth.routes.js
const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const { registerDto, loginDto, verifyOtpDto } = require('./auth.dto');

module.exports = (authController) => {
  const router = express.Router();

  router.post('/register', validate(registerDto), authController.register);
  router.post('/verify-otp', validate(verifyOtpDto), authController.verifyOtp);
  router.post('/login', validate(loginDto), authController.login);

  return router;
};
