// app.js
require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./config/db');
const RedisClient = require('./config/redis.client');
connectDB();
RedisClient.getInstance();

app.use(express.json());

// User module
const UserModel = require('./modules/user/user.model');
const UserRepository = require('./modules/user/user.repository');
const UserService = require('./modules/user/user.service');
const UserController = require('./modules/user/user.controller');
const userRoutes = require('./modules/user/user.routes');

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Auth module
const AccountModel = require('./modules/auth/account.model');
const AccountRepository = require('./modules/auth/account.repository');
const AuthService = require('./modules/auth/auth.service');
const AuthController = require('./modules/auth/auth.controller');
const authRoutes = require('./modules/auth/auth.routes');

const accountRepository = new AccountRepository(AccountModel);
const authService = new AuthService(accountRepository, userRepository);
const authController = new AuthController(authService);

// Routes
app.use('/api/users', userRoutes(userController));
app.use('/api/auth', authRoutes(authController));

// Error middleware
const errorHandler = require('./middlewares/error.middleware');
app.use(errorHandler);

module.exports = app;
