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

app.get("/", (req, res) => {
  res.render("home");
});

// for (const article of articles)

app.post("/", async (req, res) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "db_blog",
  });
  const [articles, fields] = await connection.execute("SELECT * FROM articles");
  res.redirect("/", { articles });
});

app.get("/articles", (req, res) => {
  res.render("articles");
});

// for (const article of articles)

app.post("/articles/:id", async (req, res) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "db_blog",
  });
  const [articles, fields] = await connection.execute(
    `SELECT * FROM articles WHERE id=${req.params.id}`
  );
  res.redirect("/", { articles });
});
