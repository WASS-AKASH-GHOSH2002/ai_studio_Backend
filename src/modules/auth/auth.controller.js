// auth.controller.js
const BaseController = require('../../base/base.controller');

class AuthController extends BaseController {
  constructor(authService) {
    super();
    this.authService = authService;
  }

  register = this.handle(async (req, res) => {
    const result = await this.authService.register(req.body);
    this.sendSuccess(res, result, 201);
  });


  login = this.handle(async (req, res) => {
    const result = await this.authService.login(req.body);
    this.sendSuccess(res, result);
  });

  verifyOtp = this.handle(async (req, res) => {
    const result = await this.authService.verifyOtp(req.body);
    this.sendSuccess(res, result);
  });
}

module.exports = AuthController;
