const { Article, Author, Comment, Role } = require("../models");
const formidable = require("formidable");

const today = new Date();

async function index(req, res) {
  const users = await Author.findAll({ include: Role });

  res.render("users", { users });
}
async function edit(req, res) {}

async function update(req, res) {
  const users = await Author.findAll({ include: Role });

  res.redirect("/admin/users");
}
async function destroy(req, res) {
  const { id } = req.params;
  await Author.destroy({ where: { id: `${id}` } });
  await Article.destroy({ where: { authorId: `${id}` } });
  return res.redirect("/privado/admin/users");
}

module.exports = { index, edit, update, destroy };
