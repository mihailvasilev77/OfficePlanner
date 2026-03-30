const jwt = require('jsonwebtoken');

/**
 * Middleware that validates the Bearer access token.
 * Populates req.user, req.roles, and profile fields on success.
 */
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const info = decoded.UserInfo;
    req.user = info.username;
    req.roles = info.roles;
    req.fname = info.fname;
    req.lname = info.lname;
    req.email = info.email;
    req.vacationLeaves = info.vacationLeaves;
    next();
  });
};

module.exports = verifyJWT;
