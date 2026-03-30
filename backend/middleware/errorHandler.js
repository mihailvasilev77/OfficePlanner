const { logEvents } = require('./logEvents');

/**
 * Global Express error-handling middleware.
 *
 * Any error thrown (or forwarded via `next(err)`) in a controller or
 * the asyncHandler wrapper lands here. Returns a consistent JSON response.
 */
const errorHandler = (err, req, res, _next) => {
  logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
  console.error(err.stack);

  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
