const { Model, DataTypes } = require("sequelize");

class Author extends Model {
  static initModel(sequelize) {
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
        email: {
          allowNull: false,
          type: DataTypes.STRING(100),
        },
        password:{
          allowNull: false,
          type: DataTypes.STRING(100),
        }
      },
      { sequelize, modelName: "author", timestamps: false }
    );
    return Author;
  }
}

module.exports = Author;
