const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  "APP_PORT": process.env.APP_PORT,
  "MONGO_URI": process.env.MONGO_URI,
  "JWT_SECRET": process.env.JWT_SECRET,
  "JWT_LIFETIME": process.env.JWT_LIFETIME,
  "NODE_ENV": process.env.NODE_ENV,
  "MAIL_USER": process.env.MAIL_USER,
  "MAIL_RECIPIENT": process.env.MAIL_RECIPIENT,
  "MAIL_PASS": process.env.MAIL_PASS,
}
