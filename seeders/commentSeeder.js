const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const comment = [];

  for (let i = 1; i < 10; i++) {
    comment.push({
      id: [i],
      text: faker.lorem.sentence(5),
      name: faker.name.fullName(),
      date: faker.date.past(),
      articleId: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    });
  }

  await Comment.bulkCreate(comment);
  console.log("[Database] Se corrió el seeder de Commentarios.");
};
