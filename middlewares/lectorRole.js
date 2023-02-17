function lectorRole(req, res, next) {
  if (req.user.role.code >= 100) {
    next();
  }
}

module.exports = lectorRole;
