function escritorRole(req, res, next) {
  if (req.user.role.code >= 200) {
    next();
  }
}

module.exports = escritorRole;
