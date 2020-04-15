const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    port: process.env.MAIL_USER,
    port: process.env.MAIL_PASSWORD,
  },
});
