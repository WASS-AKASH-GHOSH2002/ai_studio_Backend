// ai.controller.js
const BaseController = require('../../base/base.controller');

class AiController extends BaseController {
  constructor(aiService) {
    super();
    this.aiService = aiService;
  }

  generateEmail = this.handle(async (req, res) => {
    const email = await this.aiService.generateEmail(req.body);
    this.sendSuccess(res, { email });
  });

  generateApplication = this.handle(async (req, res) => {
    const application = await this.aiService.generateApplication(req.body);
    this.sendSuccess(res, { application });
  });
}

module.exports = AiController;
