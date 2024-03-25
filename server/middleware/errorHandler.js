const ValidationError = require("../errors/ValidationError");

const errorHandler = (err, req, res, next) => {
  console.error(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err instanceof ValidationError) {
    console.log(err.error);
    const reformatedErrorArray = err.error.map((error) => {
      return {
        status: err.status,
        statusCode: err.statusCode,
        message: error.msg,
      };
    });

    return res.status(err.statusCode).json({
      errors: reformatedErrorArray,
    });
  }

  return res.status(err.statusCode).json({
    errors: [
      {
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
      },
    ],
  });
};

module.exports = errorHandler;
