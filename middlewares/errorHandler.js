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

  res.status(httpStatusCode).json(customError);

}

module.exports = errorHandler
