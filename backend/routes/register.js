const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const { handleNewUser } = require('../controllers/registerController');

router.post('/', asyncHandler(handleNewUser));

module.exports = router;
