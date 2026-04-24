// base.controller.js
class BaseController {
  handle(fn) {
    return async (req, res, next) => {
      try {
        await fn(req, res);
      } catch (err) {
        next(err);
      }
    };
  }

  sendSuccess(res, data, statusCode = 200) {
    return res.status(statusCode).json({ success: true, data });
  }
}

module.exports = BaseController;
