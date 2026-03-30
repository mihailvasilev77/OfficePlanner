const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (!match) return res.sendStatus(401);

  const { username, fname, lname, email, vacationLeaves } = foundUser;
  const roles = Object.values(foundUser.roles).filter(Boolean);

  const accessToken = jwt.sign(
    {
      UserInfo: { username, roles, fname, lname, email, vacationLeaves },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '5m' },
  );

  const refreshToken = jwt.sign(
    { username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' },
  );

  // Persist refresh token in DB
  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  // Send refresh token as httpOnly cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: ONE_DAY_MS,
  });

  res.json({ roles, username, fname, lname, email, vacationLeaves, accessToken });
};

module.exports = { handleLogin };
