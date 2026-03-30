const express = require('express');
const router = express.Router();
const asyncHandler = require('../../middleware/asyncHandler');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const { getAllUsers, deleteUser, getUser } = require('../../controllers/usersController');

router.route('/')
  .get(verifyRoles(ROLES_LIST.Admin), asyncHandler(getAllUsers))
  .delete(verifyRoles(ROLES_LIST.Admin), asyncHandler(deleteUser));

router.route('/:id')
  .get(verifyRoles(ROLES_LIST.Admin), asyncHandler(getUser));

module.exports = router;
