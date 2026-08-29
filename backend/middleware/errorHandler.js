/**
 * Global Error Handling Middleware for Express
 * Prevents stack trace, credentials, and connection URI leakage.
 */

/**
 * 404 Handler for Unknown API Routes
 */
const notFoundHandler = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`
  });
};

/**
 * Helper to sanitize error strings and strip sensitive credentials / URI patterns
 */
const sanitizeErrorString = (input = '') => {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/mongodb(\+srv)?:\/\/[^@]+@[^\s]+/gi, 'mongodb://[REDACTED_CREDENTIALS]')
    .replace(/password=[^&\s]+/gi, 'password=[REDACTED]');
};

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  const rawMessage = err.message || 'An internal server error occurred.';
  const sanitizedMessage = sanitizeErrorString(rawMessage);

  if (!isProd) {
    console.error(`❌ [Express Error]: ${sanitizeErrorString(err.stack || rawMessage)}`);
  } else {
    console.error(`❌ [Express Error]: ${sanitizedMessage}`);
  }

  const statusCode = err.status || err.statusCode || 500;
  
  // Public validation errors return sanitized message; internal 500s return safe message in prod
  let clientMessage = err.isPublic || statusCode === 400 || statusCode === 404
    ? sanitizedMessage 
    : 'An internal server error occurred while processing your request.';

  return res.status(statusCode).json({
    success: false,
    message: clientMessage
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};

