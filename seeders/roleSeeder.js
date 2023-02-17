// const { faker } = require("@faker-js/faker");
const { Role } = require("../models");

module.exports = async () => {
  const roles = [];

  roles.push({ name: "Lector", code: 100 });
  roles.push({ name: "Escritor", code: 200 });
  roles.push({ name: "Editor", code: 300 });
  roles.push({ name: "Admin", code: 400 });

  await Role.bulkCreate(roles);
};
