/**
 * Factory that returns middleware to guard routes by role.
 *
 *   router.get('/', verifyRoles(ROLES_LIST.Admin), controller);
 */
const verifyRoles = (...allowedRoles) => (req, res, next) => {
  if (!req?.roles) return res.sendStatus(401);

  const hasRole = req.roles.some((role) => allowedRoles.includes(role));
  if (!hasRole) return res.sendStatus(401);

  next();
};

module.exports = verifyRoles;
