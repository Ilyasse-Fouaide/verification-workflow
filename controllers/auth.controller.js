const { StatusCodes } = require("http-status-codes");
const tryCatchWrapper = require("../tryCatchWrapper");

module.exports.register = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.CREATED).json({ success: true, message: "register" })
});

module.exports.login = tryCatchWrapper(async (req, res, next) => {
  res.status(StatusCodes.CREATED).json({ success: true, message: "login" })
});