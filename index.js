require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
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

app.get("/", async (req, res) => {
  const articles = await Article.findAll({ include: Author });
  console.log(articles);
  res.render("home", { articles });
});

app.get("/article/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const article = await Article.findByPk(id, { include: Author });
  res.render("article", { article });
});
