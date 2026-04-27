// ai.dto.js
const { z } = require('zod');

const generateEmailDto = z.object({
  purpose: z.string().min(3),
  tone: z.string().min(3),
  details: z.string().min(5),
});

const generateApplicationDto = z.object({
  applicationType: z.string().min(3),
  tone: z.string().min(3),
  recipient: z.string().min(3),
  subject: z.string().min(3),
  details: z.string().min(5),
});

module.exports = { generateEmailDto, generateApplicationDto };
