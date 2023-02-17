const { Article } = require("../models");
const { faker } = require("@faker-js/faker");
faker.locale = "es";

module.exports = async () => {
  const articles = [];

  for (let i = 1; i < 10; i++) {
    articles.push({
      id: [i],
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(1),
      img: faker.image.abstract(false),
      date: faker.date.past(),
      authorId: faker.helpers.arrayElement([1, 2, 3, 4]),
    });
  }

  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
