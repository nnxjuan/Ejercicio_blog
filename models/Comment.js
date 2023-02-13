const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
  static initModel(sequelize) {
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
        date: {
          allowNull: false,
          type: DataTypes.DATEONLY,
        },
      },
      { sequelize, modelName: "comment", timestamps: false }
    );
    return Comment;
  }
}

module.exports = Comment;
