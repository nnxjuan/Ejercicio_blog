function admRole(req, res, next) {
  res.locals.user = req.user;
  if (req.user.role.code >= 400) {
    next();
  }
  res.redirect("/");
}

module.exports = admRole;
