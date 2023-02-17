function editorRole(req, res, next) {
  const { id } = req.params;
  if (req.user.role.code >= 300) {
    next();
  }
}

module.exports = editorRole;
