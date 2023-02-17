function editorRole(req, res, next) {
  const { id } = req.params;
  res.locals.user = req.user;
  if (req.user.role.code >= 300) {
    next();
  }
}

module.exports = editorRole;
