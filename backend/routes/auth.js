const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const { handleLogin } = require('../controllers/authController');

router.post('/', asyncHandler(handleLogin));

module.exports = router;
