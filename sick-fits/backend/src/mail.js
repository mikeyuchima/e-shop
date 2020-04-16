const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    port: process.env.MAIL_USER,
    port: process.env.MAIL_PASSWORD,
  },
});

const email = text => `
 <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
 ">
 <h2>Hey<h2/>
 <p>${text}</p>
 </div>
`;

exports.transport = transport;
exports.email = email;
