const nodemailer = require("nodemailer");
const config = require("../config");

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.MAIL_USER,  // your email
      pass: config.MAIL_PASS,  // your APP password
    },
  });

  const mailOptions = {
    from: "HIRAYA <hiraya@mail.com>",
    to,
    subject,
    text: "confirm your email.",
    html
  };

  return await transporter.sendMail(mailOptions);
}

module.exports = sendEmail
