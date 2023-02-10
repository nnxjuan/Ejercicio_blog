require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => console.log("Probando puerto"));

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
      allowNull: false,
      type: DataTypes.DATEONLY,
    },

    comment: {
      allowNull: false,
      type: DataTypes.STRING(255),
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
// Un articulo pertenece a un autor
Article.belongsTo(Author);
// Un autor puede tener muchos articulos
Author.hasMany(Article);

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
  const article = await Article.findByPk(id, { include: Author });
  res.render("article", { article });
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

app.get("/admin/create", async (req, res) => {
  res.render("admin/create");
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
  //   await Article.update(
  //     {
  //       title: req.body.title,
  //       content: req.body.content,
  //       img: req.body.image,
  //     },
  //     {
  //       where: {
  //         id: req.params,
  //       },
  //     }
  //   );
  return res.redirect("/admin");
});

//ELIMINAR ARTICULO
app.get("/admin/delet/:id", async (req, res) => {
  const { id } = req.params;
  await Article.destroy({ where: { id: `${id}` }, include: Author });
  return res.redirect("/admin");
});
