const { StatusCodes, ReasonPhrases } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
  var httpStatusCode = err.httpStatusCode || StatusCodes.INTERNAL_SERVER_ERROR
  var customError = {
    success: false,
    error: {
      status: httpStatusCode,
      message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    }
  }

  if (err.code && err.code === 11000) {
    httpStatusCode = StatusCodes.BAD_REQUEST;
    customError.error.status = httpStatusCode;
    customError.error.message = `The email has already been taken.`;
  }

  if (err.name && err.name === "CastError" && err.kind === "ObjectId") {
    httpStatusCode = StatusCodes.BAD_REQUEST;
    customError.error.status = httpStatusCode;
    customError.error.message = `Please enter a valid _id`;
  }

  res.status(httpStatusCode).json(customError);

}

module.exports = errorHandler
