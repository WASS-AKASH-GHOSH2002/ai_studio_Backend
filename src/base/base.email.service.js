// base.email.service.js
const EmailTransporter = require('../config/email.transporter');

class BaseEmailService {
  async sendMail({ to, subject, html }) {
    const transporter = EmailTransporter.getInstance();
    return await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
  }
}

module.exports = BaseEmailService;
