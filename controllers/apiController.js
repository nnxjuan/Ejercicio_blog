const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Author, Role, Article } = require("../models");
const { Op } = require("sequelize");
const { findByPk } = require("../models/Author");

async function tokens(req, res) {
  const user = await Author.findOne({
    where: { email: req.body.email },
    include: Role,
  });
  if (!user) {
    console.log("Nombre de usuario no existe.");
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    console.log("La contraseña es inválida.");
  }
  const token = jwt.sign({ id: user.id }, process.env.TOKEN);
  return res.json({ token: token });
}

async function index(req, res) {
  if (req.query.userid) {
    const articles = await Article.findAll({
      order: [["date", "DESC"]],
      where: { authorId: req.query.userid },
      include: Author,
    });
    return res.json(articles);
  } else if (req.query.title) {
    const resultado = await Article.findAll({
      where: {
        title: {
          [Op.substring]: `${req.query.title}`,
        },
      },
    });

    return res.json(resultado);
  }
  const articles = await Article.findAll();
  return res.json(articles);
}

async function create(req, res) {
  const newArticle = await Article.create({
    title: req.body.title,
    content: req.body.content,
    img: req.body.img,
    date: req.body.date,
    authorId: req.body.authorId,
  });
  return res.json(newArticle);
}
async function edit(req, res) {
  const update = await Article.update(
    {
      title: req.boy.title,
      content: req.body.content,
      img: req.body.img,
    },
    {
      where: {
        id: req.body.authorId,
      },
    }
  );
  return res.json(update);
}

module.exports = { tokens, index, create, edit };
