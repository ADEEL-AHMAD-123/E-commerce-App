const { constants } = require("../constants");

const handleJsonWebTokenError = (err, res) => {
  res.status(constants.UNAUTHORIZED).json({
    title: "Json Web Token Error",
    message: "Json Web Token is invalid or expired",
    stackTrace: err.stack,
  });
};

const handleCastError = (err, res) => {
  res.status(constants.NOT_FOUND).json({
    title: "Cast Error",
    message: `Resource not found. Invalid: ${err.path}`,
    stackTrace: err.stack,
  });
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Specific error checks
  if (err.name === "JsonWebTokenError") {
    return handleJsonWebTokenError(err, res);
  }

  if (err.name === "CastError") {
    return handleCastError(err, res);
  }

  // Handle specific status codes
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
    case constants.NOT_FOUND:
    case constants.UNAUTHORIZED:
    case constants.FORBIDDEN:
    case 11000:
    case constants.SERVER_ERROR:
      res.status(statusCode).json({
        title: "Error",
        message: message,
        stackTrace: err.stack,
      });
      break;

    default:
      res.status(constants.SERVER_ERROR).json({
        title: "Error",
        message: "An unexpected error occurred",
        stackTrace: err.stack,
      });
      break;
  }
};

module.exports = errorHandler;
