// ai.service.js
const OpenAI = require('openai');

class AiService {
  constructor() {
    this.client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    });
  }

  async generateEmail({ purpose, tone, details }) {
    const prompt = `
Write a professional email.

Purpose: ${purpose}
Tone: ${tone}
Details: ${details}

Include:
- Subject
- Email Body
- Closing
`;
    const response = await this.client.chat.completions.create({
      model: 'tencent/hy3-preview:free',
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
  }

  async generateApplication({ applicationType, tone, recipient, subject, details }) {
    const prompt = `
Write a professional ${applicationType}.

Recipient: ${recipient}
Tone: ${tone}
Subject: ${subject}
Details: ${details}

Include:
- Subject Line
- Salutation
- Application Body
- Closing
`;
    const response = await this.client.chat.completions.create({
      model: 'tencent/hy3-preview:free',
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
  }
}

module.exports = AiService;
