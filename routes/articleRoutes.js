const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);
router.get("/article/:id", articleController.show);
router.get("/admin", articleController.admin);
router.get("/admin/create", articleController.create);
router.post("/admin/create", articleController.store);
router.get("/admin/edit/:id", articleController.edit);
router.post("/admin/edit/:id", articleController.update);
router.get("/admin/delet/:id", articleController.destroy);
router.post("/article/:id", articleController.createComment);

module.exports = router;
