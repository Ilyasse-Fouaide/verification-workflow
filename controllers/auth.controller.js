const { StatusCodes } = require("http-status-codes");
const tryCatchWrapper = require("../tryCatchWrapper");
const customError = require("../customError")
const { setCookie, sendEmail } = require("../utils");
const registerSchema = require("../Joi/registerSchema");
const crypto = require("crypto");
const User = require("../models/user.model");

module.exports.register = tryCatchWrapper(async (req, res, next) => {
  const { username, email, password } = req.body

  // Validate the data using Joi schema
  await registerSchema.validateAsync({ username, email, password }, { abortEarly: false });

  const count = await User.countDocuments();
  const role = count === 0 ? "admin" : "basic";

  const verificationToken = crypto.randomBytes(40).toString("hex")

  const user = await User.create({
    username,
    email,
    password,
    role,
    verificationToken
  });

  await sendEmail({
    to: user.email,
    subject: "Email confirmation",
    html: `<h4>Hi!, ${user.username}</h4>
      Please click on the following link to verify your account:<br/>
      <a href="http://localhost:3000/verify?token=${user.verificationToken}&email=${user.email}">Click Here 👋</a>`
  });

  // setCookie(res, user.genToken());

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Check your email address to verify account."
  })
});

module.exports.verifyEmail = tryCatchWrapper(async (req, res, next) => {
  const { verificationToken, email } = req.body;

  if (!verificationToken || !email) {
    return next(customError.badRequestError("Missing fields"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(customError.unAuthorizedError("Verification Failed."))
  }

  if (verificationToken !== user.verificationToken) {
    return next(customError.unAuthorizedError("Verification Failed"))
  }

  user.verificationToken = null;
  user.isVerified = true;
  user.verifiedAt = Date.now();
  await user.save();

  res.status(StatusCodes.OK).json({ success: true, message: "email verified." })
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
