// email.transporter.js
const nodemailer = require('nodemailer');

class EmailTransporter {
  static instance = null;

  static getInstance() {
    if (!EmailTransporter.instance) {
      EmailTransporter.instance = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE === 'true',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    }
    return EmailTransporter.instance;
  }
}

module.exports = EmailTransporter;
