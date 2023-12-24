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

  if (err.details) {
    httpStatusCode = StatusCodes.BAD_REQUEST;
    customError.error.status = httpStatusCode;
    const joiError = err.details.map(({ path, message }) => {
      return { [path[0]]: message }
    });
    const message = Object.assign({}, ...joiError)
    customError.error.message = message
  }

  res.status(httpStatusCode).json(customError);

}

module.exports = errorHandler
