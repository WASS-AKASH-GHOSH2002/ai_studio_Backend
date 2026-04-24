// user.controller.js
const BaseController = require('../../base/base.controller');

class UserController extends BaseController {
  constructor(userService) {
    super();
    this.userService = userService;
  }

  createUser = this.handle(async (req, res) => {
    const user = await this.userService.createUser(req.body);
    this.sendSuccess(res, user, 201);
  });

  getUsers = this.handle(async (req, res) => {
    const users = await this.userService.getUsers();
    this.sendSuccess(res, users);
  });
}

module.exports = UserController;
