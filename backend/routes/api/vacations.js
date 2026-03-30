const express = require('express');
const router = express.Router();
const asyncHandler = require('../../middleware/asyncHandler');
const {
  handleVacation,
  getAllVacations,
  getVacation,
  getVacationsByUsername,
} = require('../../controllers/vacationController');

router.route('/')
  .get(asyncHandler(getAllVacations))
  .post(asyncHandler(handleVacation));

// NEW: filter vacations by username (used by PersonalCalendar)
router.route('/user/:username')
  .get(asyncHandler(getVacationsByUsername));

router.route('/:id')
  .get(asyncHandler(getVacation));

module.exports = router;
