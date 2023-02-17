function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;

    next(); // Se hace el render de admin
  } else {
    res.redirect("/login");
  }
}

module.exports = isAuthenticated;
