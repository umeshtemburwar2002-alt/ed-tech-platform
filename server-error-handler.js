/**
 * College LMS - Error Handler Middleware
 * Centralized error handling for Express routes
 */

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    success: false,
    message: err.message || 'Internal Server Error',
    statusCode: err.statusCode || 500,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  };

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      success: false,
      message: 'Invalid token',
      statusCode: 401,
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      success: false,
      message: 'Token expired',
      statusCode: 401,
    };
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error = {
      success: false,
      message: 'Validation failed',
      statusCode: 400,
      details: err.details,
    };
  }

  // Supabase errors
  if (err.code) {
    switch (err.code) {
      case '23505': // Unique violation
        error = {
          success: false,
          message: 'Resource already exists',
          statusCode: 409,
        };
        break;
      case '23503': // Foreign key violation
        error = {
          success: false,
          message: 'Referenced resource does not exist',
          statusCode: 400,
        };
        break;
      case 'PGRST116': // Not found
        error = {
          success: false,
          message: 'Resource not found',
          statusCode: 404,
        };
        break;
      default:
        error = {
          success: false,
          message: 'Database error',
          statusCode: 500,
        };
    }
  }

  res.status(error.statusCode).json(error);
};

export default errorHandler;
