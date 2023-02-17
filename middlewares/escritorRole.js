function escritorRole(req, res, next) {
  res.locals.user = req.user;
  if (req.user.role.code >= 200) {
    next();
  }
}

module.exports = escritorRole;
