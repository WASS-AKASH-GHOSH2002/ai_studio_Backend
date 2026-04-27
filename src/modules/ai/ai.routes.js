// ai.routes.js
const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const { generateEmailDto, generateApplicationDto } = require('./ai.dto');

module.exports = (aiController) => {
  const router = express.Router();

  router.post('/generate-email', authMiddleware, validate(generateEmailDto), aiController.generateEmail);
  router.post('/generate-application', authMiddleware, validate(generateApplicationDto), aiController.generateApplication);

  return router;
};
