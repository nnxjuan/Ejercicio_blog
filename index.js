require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const { Sequelize, Model, DataTypes } = require("sequelize");

//const sequelize = new Sequelize('database', 'username', 'password')
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
  }
);

// Herencia
class Article extends Model {}
Article.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(500),
    },
    img: {
      allowNull: false,
      type: DataTypes.STRING(500),
    },
    date: {
      allowNull: true,
      type: DataTypes.DATEONLY,
    },
  },
  { sequelize, modelName: "article", timestamps: false }
);

// Herencia
class Author extends Model {}
Author.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    firstname: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    mail: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
  },
  { sequelize, modelName: "author", timestamps: false }
);
// Herencia
class Comment extends Model {}
Comment.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },

    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
  },
  { sequelize, modelName: "comment", timestamps: false }
);
// Un articulo pertenece a un autor
Article.belongsTo(Author);
// Un autor puede tener muchos articulos
Author.hasMany(Article);
Comment.belongsTo(Article);
Article.belongsTo(Comment);
sequelize.sync();
//HOME
app.get("/", async (req, res) => {
  const articles = await Article.findAll({ include: Author });
  console.log(articles);
  res.render("home", { articles });
});
//ARTICULOS
app.get("/article/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const comments = await Comment.findAll();
  const article = await Article.findByPk(id, { include: Author });
  res.render("article", { article, comments });
});
//ADMIN
app.get("/admin", async (req, res) => {
  const articles = await Article.findAll({ include: Author });
  console.log(articles);
  res.render("admin", { articles });
});

// CREAR ARTICULO
app.get("/admin/create", async (req, res) => {
  res.render("create");
});

app.post("/admin/create", async (req, res) => {
  const rBody = req.body;
  await Article.create({
    title: req.body.title,
    content: req.body.content,
    img: req.body.image,
    date: req.body.date,
    authorId: 1,
  });

  return res.redirect("/");
});

//EDITAR ARTICULO
app.get("/admin/edit/:id", async (req, res) => {
  const { id } = req.params;
  const article = await Article.findByPk(id, { include: Author });
  res.render("edit", { article });
});

app.post("/admin/edit/:id", async (req, res) => {
  const { id } = req.params;
  const rBody = req.body;
  await Article.update(
    {
      title: req.body.title,
      content: req.body.content,
      img: req.body.image,
    },
    {
      where: {
        id: `${id}`,
      },
    }
  );
  return res.redirect("/admin");
});

//ELIMINAR ARTICULO
app.get("/admin/delet/:id", async (req, res) => {
  const { id } = req.params;
  await Article.destroy({ where: { id: `${id}` }, include: Author });
  return res.redirect("/admin");
});
