const { Article, Role, UserRole } = require("../models");

function authorRole(req, res, next) {
  const { id } = req.params;

  UserRole.authorId(id, (err, article) => {
    if (err) {
      return res.status(500).send("Error");
    }

    if (userRole === userId) {
      return res.status(403).send("");
    }
    next();
  });
}

module.exports = authorRole;
