require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const credentials = require('./middleware/credentials');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');

const app = express();
const PORT = process.env.PORT || 3500;

// ── Database ────────────────────────────────────────────────────────
connectDB();

// ── Global middleware ───────────────────────────────────────────────
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// ── Public routes (no JWT required) ─────────────────────────────────
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// ── Protected routes (JWT required) ─────────────────────────────────
app.use(verifyJWT);
app.use('/request', require('./routes/request'));
app.use('/pending', require('./routes/api/pendings'));
app.use('/vacation', require('./routes/api/vacations'));
app.use('/users', require('./routes/api/users'));

// ── 404 catch-all (JSON-only, no HTML views for a SPA backend) ──────
app.all('*', (req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

// ── Global error handler ────────────────────────────────────────────
app.use(errorHandler);

// ── Start server ────────────────────────────────────────────────────
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
