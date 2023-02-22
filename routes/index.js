const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
const commentRoutes = require("./commentRoutes");
const apiRoutes = require("./apiRoutes");
const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");

module.exports = (app) => {
  app.use("/api", apiRoutes);
  app.use("/", userRoutes);
  app.use("/", articleRoutes);
  app.use("/comentarios", commentRoutes);
  app.use("/privado", privateRoutes);
};
