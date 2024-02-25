const express = require('express');
const router = express.Router();
const vacationController = require('../../controllers/vacationController');

router.route('/')
    .get(vacationController.getAllVacations)
    .post(vacationController.handleVacation);

module.exports = router;