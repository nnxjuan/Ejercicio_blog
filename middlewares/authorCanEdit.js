const { Article } = require("../models");

function authorCanEdit(req, res, next) {
  //const userId = req.user.id;
  //const articleId = req.params.articleId
  const { id } = req.params;
  const articleId = req.params.articleId;

  Article.findByPk(id, (err, article) => {
    if (err) {
      return res.status(500).send("Error tratando de abrir articulo");
    }
    if (!article) {
      return res.status(404).send("No encontramos tu articulo");
    }
    if (article.author !== userId) {
      return res
        .status(403)
        .send("Este articulo no es tuyo, no es posible editarlo");
    }
    next();
  });
}

module.exports = authorCanEdit;
