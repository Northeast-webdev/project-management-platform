const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error(err);

  // PostgreSQL error handling
  if (err.code === '23505') {
    // Unique violation
    const message = 'Resource already exists';
    error = { message, statusCode: 409 };
  }

  if (err.code === '23503') {
    // Foreign key violation
    const message = 'Referenced resource does not exist';
    error = { message, statusCode: 400 };
  }

  if (err.code === '23502') {
    // Not null violation
    const message = 'Required field is missing';
    error = { message, statusCode: 400 };
  }

  // Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.details).map(val => val.message);
    error = { message: message.join(', '), statusCode: 400 };
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;