const { faker } = require("@faker-js/faker");
const { Author } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const authors = [];

  for (let i = 1; i <= 5; i++) {
    authors.push({
      id: [i],
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: await bcrypt.hash("1234", 8),
      roleId: faker.helpers.arrayElement([1, 2, 3, 4]),
    });
  }

  await Author.bulkCreate(authors);
  console.log("[Database] Se corrió el seeder de Author.");
};
