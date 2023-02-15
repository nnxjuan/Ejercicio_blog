const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const isAuthenticated = require("../middlewares/isAuthenticated")

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);
router.get("/article/:id",isAuthenticated, articleController.show);
router.get("/admin",isAuthenticated, articleController.admin);
router.get("/admin/create",isAuthenticated, articleController.create);
router.post("/admin/create",isAuthenticated, articleController.store);
router.get("/admin/edit/:id",isAuthenticated, articleController.edit);
router.post("/admin/edit/:id",isAuthenticated, articleController.update);
router.get("/admin/delet/:id",isAuthenticated, articleController.destroy);
router.post("/article/:id",isAuthenticated, articleController.createComment);
//algo
module.exports = router;
