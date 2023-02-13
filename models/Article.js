const { Model, DataTypes } = require("sequelize");

class Article extends Model {
  static initModel(sequelize) {
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

    return Article;
  }
}

module.exports = Article;
