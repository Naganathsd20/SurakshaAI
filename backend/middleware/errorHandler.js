/**
 * Global Error Handling Middleware for Express
 * Prevents stack trace leakage and provides consistent JSON error responses.
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
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(`❌ [Express Error]: ${err.stack || err.message || err}`);

  const statusCode = err.status || err.statusCode || 500;
  const clientMessage = err.isPublic ? err.message : 'An internal server error occurred while processing your request.';

  return res.status(statusCode).json({
    success: false,
    message: clientMessage
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
