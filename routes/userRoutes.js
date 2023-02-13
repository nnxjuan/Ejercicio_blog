const express = require("express");
const router = express.Router();
const userController = require("../controllers/articleController");

// Rutas relacionadas a los usuarios:
// ...

router.get("/", userController.index);
router.get("/crear", userController.create);
router.get("/", userController.store);
router.get("/:id", userController.show);
router.get("/:id/editar", userController.edit);
router.get("/:id", userController.update);
router.get("/:id", userController.destroy);

module.exports = router;
