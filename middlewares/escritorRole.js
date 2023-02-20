function escritorRole(req, res, next) {
  if (req.user.role.code >= 200) {
    next();
  }
  res.send("No tiene permisos");
}

module.exports = escritorRole;
