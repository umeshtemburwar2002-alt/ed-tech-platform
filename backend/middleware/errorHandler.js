/**
 * Centralized error-handling middleware.
 *
 * Catches all errors thrown (or passed via next(err)) in route handlers and
 * returns a consistent JSON envelope. In development, the stack trace is
 * included; in production it is omitted.
 */
function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[ERROR] ${statusCode} — ${message}`);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}

module.exports = errorHandler;
