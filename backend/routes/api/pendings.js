const express = require('express');
const router = express.Router();
const asyncHandler = require('../../middleware/asyncHandler');
const { getPendings, getPending, deletePending } = require('../../controllers/pendingController');

router.route('/')
  .get(asyncHandler(getPendings));

router.route('/:id')
  .get(asyncHandler(getPending))
  .delete(asyncHandler(deletePending));

module.exports = router;
