const User = require('../model/User');
const jwt = require('jsonwebtoken');

/**
 * Refresh-token controller.
 *
 * BUG FIX: The old code read fname, lname, email, and vacationLeaves
 * from the decoded refresh-token payload — but those fields were never
 * embedded in the refresh token (only `username` is). They were always
 * `undefined`, so the new access token contained no profile data.
 *
 * Now we read those fields from the database `foundUser` document.
 */
const handleRefreshToken = async (req, res) => {
  const { jwt: refreshToken } = req.cookies;
  if (!refreshToken) return res.sendStatus(401);

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }

    const { username, fname, lname, email, vacationLeaves } = foundUser;
    const roles = Object.values(foundUser.roles).filter(Boolean);

    const accessToken = jwt.sign(
      {
        UserInfo: { username, roles, fname, lname, email, vacationLeaves },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '5m' },
    );

    res.json({ roles, username, fname, lname, email, vacationLeaves, accessToken });
  });
};

module.exports = { handleRefreshToken };
