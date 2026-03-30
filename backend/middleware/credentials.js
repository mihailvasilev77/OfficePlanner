const allowedOrigins = require('../config/allowedOrigins');

/**
 * Sets the Access-Control-Allow-Credentials header for allowed origins.
 * Must run BEFORE the CORS middleware.
 */
const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
};

module.exports = credentials;
