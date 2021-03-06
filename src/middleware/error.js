const logger = require('../config/winston');
const { env } = require('../config');

module.exports = (error, request, response, next) => {
  const errorMessage = error.rawError ? error.rawError.message : error;

  if (env !== 'test') {
    logger.error({
      message: `${errorMessage}`,
      stack: error.stack,
    });
  }

  // Operational, trusted error
  if (error.isOperational) {
    return response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
  // Programming or other unknown error
  return response.status(500).json({
    status: 'error',
    message: 'Oops! Something went wrong',
  });
};
