const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const { handleRequest } = require('../controllers/requestController');

router.post('/', asyncHandler(handleRequest));

module.exports = router;
