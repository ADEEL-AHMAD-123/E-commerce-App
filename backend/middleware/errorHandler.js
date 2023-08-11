const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode ? err.statusCode : 500;
  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;

    res.status(statusCode).json({
      title: "JsonWebTokenError",
      message: message,
      stackTrace: err.stack,
    });
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;

    res.status(statusCode).json({
      title: "TokenExpiredError",
      message: message,
      stackTrace: err.stack,
    });
  }

  

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.status(statusCode).json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.status(statusCode).json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case 11000:
      res.status(statusCode).json({
        title: "Mongoose duplicate key error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.status(statusCode).json({
        title: "Server Errorr",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

        // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;

    res.status(statusCode).json({
      title: "CastError",
      message: message,
      stackTrace: err.stack,
    });
  }


    default:
      console.log("No Error, All good !");
      break;
  }
}; 

module.exports = errorHandler;
