const customError = require("../customError");

const notFound = (req, res, next) => {
  next(customError.notFoundError(`${req.method}: ${req.url}, doesn't match.`))
}

module.exports = notFound
