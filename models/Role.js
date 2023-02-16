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
        role: {
          allowNull: false,
          type: DataTypes.STRING(100),
        },
      },
      { sequelize, modelName: "role", timestamps: false }
    );

    return Role;
  }
}

module.exports = Role;
