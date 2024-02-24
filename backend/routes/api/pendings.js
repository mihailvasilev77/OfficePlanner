const express = require('express');
const router = express.Router();
const pendingController = require('../../controllers/pendingController');

router.route('/')
    .get(pendingController.getPendings);

router.route('/:id')
    .get(pendingController.getPending)
    .delete(pendingController.deletePending);


module.exports = router;