function lectorRole(req, res, next) {
  res.locals.user = req.user;

  if (req.user.role.code >= 100) {
    next();
  }
}

module.exports = lectorRole;
