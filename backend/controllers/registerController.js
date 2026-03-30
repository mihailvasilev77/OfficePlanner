const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { user, fname, lname, email, pwd } = req.body;

  if (!user || !pwd || !email) {
    return res.status(400).json({ message: 'Username, password and email are required.' });
  }

  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);

  const hashedPwd = await bcrypt.hash(pwd, 10);

  const result = await User.create({
    username: user,
    fname,
    lname,
    email,
    password: hashedPwd,
  });

  res.status(201).json({ success: `New user ${result.username} created!` });
};

module.exports = { handleNewUser };
