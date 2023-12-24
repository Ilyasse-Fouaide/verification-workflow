const { ReasonPhrases } = require("http-status-codes")
const customError = require("../customError");
const jwt = require("jsonwebtoken");
const config = require("../config");

const authorize = (req, res, next) => {
  const { refresh_token } = req.cookies;

  if (!refresh_token) {
    return next(customError.unAuthorizedError(ReasonPhrases.UNAUTHORIZED))
  }

  jwt.verify(refresh_token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(customError.unAuthorizedError(ReasonPhrases.UNAUTHORIZED))
    }

    const user = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role
    }
    req.user = user;
    next()
  });
}

module.exports = authorize
