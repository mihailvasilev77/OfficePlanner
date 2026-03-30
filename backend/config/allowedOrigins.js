/**
 * Origins allowed to make cross-origin requests.
 * Keep in sync with the frontend dev server and production URL.
 */
const allowedOrigins = [
  'http://localhost:3000',   // Vite dev server
  'http://localhost:5173',   // Vite default port
  'http://127.0.0.1:5173',
];

module.exports = allowedOrigins;
