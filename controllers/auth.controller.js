const { StatusCodes } = require("http-status-codes");
const isEmail = require('validator/lib/isEmail');
const tryCatchWrapper = require("../tryCatchWrapper");
const customError = require("../customError")
const { setCookie } = require("../utils");
const User = require("../models/user.model");

module.exports.register = tryCatchWrapper(async (req, res, next) => {
  const { username, email, password } = req.body

  if (!isEmail(email)) {
    return next(customError.badRequestError("Please fill valid email."))
  }

  const count = await User.countDocuments();
  console.log(count);
  const role = count === 0 ? "admin" : "basic";

  const user = await User.create({
    username,
    email,
    password,
    role
  });

  setCookie(res, user.genToken());

  res.status(StatusCodes.CREATED).json({ success: true })
});

module.exports.login = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.CREATED).json({ success: true, message: "login" })
});
