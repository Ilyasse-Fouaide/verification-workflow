const { StatusCodes } = require("http-status-codes");

class CustomError extends Error {
  constructor(message, httpStatusCode) {
    super(message);
    this.httpStatusCode = httpStatusCode
  }
}

module.exports.badRequestError = (message) => {
  return new CustomError(message, StatusCodes.BAD_REQUEST)
}

module.exports.unAuthorizedError = (message) => {
  return new CustomError(message, StatusCodes.UNAUTHORIZED)
}

module.exports.forbiddenError = (message) => {
  return new CustomError(message, StatusCodes.FORBIDDEN)
}

module.exports.notFoundError = (message) => {
  return new CustomError(message, StatusCodes.NOT_FOUND)
}
