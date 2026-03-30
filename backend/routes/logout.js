const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const { handleLogout } = require('../controllers/logoutController');

router.get('/', asyncHandler(handleLogout));

module.exports = router;
