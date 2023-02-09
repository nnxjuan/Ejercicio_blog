const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.listen(port, () => console.log("Probando puerto"));

const { Sequelize, Model, DataTypes } = require("sequelize");

//const sequelize = new Sequelize('database', 'username', 'password')
const sequelize = new Sequelize("Blog", "root", "root1234", {
  host: "localhost",
  dialect: "mysql",
});

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
    author: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    comment: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
  },
  { sequelize, modelName: "article", timestamps: false }
);

app.get("/", async (req, res) => {
  const articles = await Article.findAll();
  console.log(articles);
  res.render("home", { articles });
});

app.get("/article/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const article = await Article.findByPk(id);
  res.render("article", { article });
});

// for (const article of articles)

// app.post("/articles/:id", async (req, res) => {
//   const { id } = req.params;
//   const article = await Article.findByPk(id);
//   res.redirect("/article", { article });
// });
