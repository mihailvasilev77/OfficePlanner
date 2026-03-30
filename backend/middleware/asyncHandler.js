/**
 * Wraps an async Express route handler so that any rejected promise
 * is automatically forwarded to the global error-handling middleware.
 *
 * Eliminates the need for try/catch in every single controller.
 *
 * Usage:
 *   router.get('/', asyncHandler(myController));
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
