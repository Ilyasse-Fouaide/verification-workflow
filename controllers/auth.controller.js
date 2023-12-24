const { StatusCodes } = require("http-status-codes");
const isEmail = require('validator/lib/isEmail');
const tryCatchWrapper = require("../tryCatchWrapper");
const customError = require("../customError")
const { setCookie } = require("../utils");
const registerSchema = require("../Joi/registerSchema");
const User = require("../models/user.model");

module.exports.register = tryCatchWrapper(async (req, res, next) => {
  const { username, email, password } = req.body

  // Validate the data using Joi schema
  await registerSchema.validateAsync({ username, email, password }, { abortEarly: false });

  const count = await User.countDocuments();
  const role = count === 0 ? "admin" : "basic";

  const user = await User.create({
    username,
    email,
    password,
    role,
    verificationToken: "TEMP: FakeToken"
  });

  // setCookie(res, user.genToken());

  res.status(StatusCodes.CREATED).json({ success: true, verificationToken: user.verificationToken })
});

module.exports.login = tryCatchWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(customError.badRequestError("email or password required."))
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(customError.notFoundError("Invalid Credentials."))
  }

  const compare = await user.comparePassword(password, user.password);

  if (!compare) {
    return next(customError.notFoundError("Invalid Credentials."))
  }

  if (!user.isVerified) {
    return next(customError.unAuthorizedError("Please verify your email."))
  }

  setCookie(res, user.genToken());

  res.status(StatusCodes.OK).json({ success: true })
});

module.exports.logout = tryCatchWrapper(async (req, res, next) => {
  res.cookie("refresh_token", "", { httpOnly: true, expires: new Date(0) }).json({ success: true, message: "Logged Out success." })
});

module.exports.profile = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ success: true, user: req.user })
});
