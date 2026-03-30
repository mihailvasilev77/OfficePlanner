const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const { handleRefreshToken } = require('../controllers/refreshTokenController');

router.get('/', asyncHandler(handleRefreshToken));

module.exports = router;
