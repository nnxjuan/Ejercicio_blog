const { Model, DataTypes } = require("sequelize");

class Role extends Model {
  static initModel(sequelize) {
    Role.init(
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING(100),
        },
        code: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
      },
      { sequelize, modelName: "role", timestamps: false }
    );

    return Role;
  }
}

module.exports = Role;
