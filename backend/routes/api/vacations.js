const express = require('express');
const router = express.Router();
const createController = require('../../controllers/createController');

router.route('/')
    .get(createController.getAllVacations)
    .post(createController.handleVacation);

module.exports = router;