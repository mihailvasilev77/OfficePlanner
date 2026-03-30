const User = require('../model/User');

const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password -refreshToken');
  if (!users?.length) {
    return res.status(204).json({ message: 'No users found' });
  }
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req.body?.id) {
    return res.status(400).json({ message: 'User ID required' });
  }

  const user = await User.findById(req.body.id).exec();
  if (!user) {
    return res.status(404).json({ message: `User ID ${req.body.id} not found` });
  }

  const result = await user.deleteOne();
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req.params?.id) {
    return res.status(400).json({ message: 'User ID required' });
  }

  const user = await User.findById(req.params.id).select('-password -refreshToken').exec();
  if (!user) {
    return res.status(404).json({ message: `User ID ${req.params.id} not found` });
  }

  res.json(user);
};

module.exports = { getAllUsers, deleteUser, getUser };
