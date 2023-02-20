require("dotenv").config();
const roleSeeder = require("./roleSeeder");
const authorSeeder = require("./authorSeeder");
const articleSeeder = require("./articleSeeder");
const commentSeeder = require("./commentSeeder");

async function runAllSeeders() {
  // await roleSeeder();
  // await authorSeeder();
  await articleSeeder();
  // await commentSeeder();
}
runAllSeeders();
