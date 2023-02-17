function admRole(req, res, next) {
  if (req.user.role.code >= 400) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = admRole;
