// user.routes.js
const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');
const permissionMiddleware = require('../../middlewares/permission.middleware');
const { createUserDto } = require('./user.dto');

module.exports = (userController) => {
  const router = express.Router();

  router.post('/',
    authMiddleware,
    roleMiddleware('admin'),
    permissionMiddleware('user:create'),
    validate(createUserDto),
    userController.createUser
  );

  router.get('/',
    authMiddleware,
    roleMiddleware('admin', 'user'),
    permissionMiddleware('user:read'),
    userController.getUsers
  );

  return router;
};
