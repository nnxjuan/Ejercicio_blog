const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// // Rutas relacionadas a los usuarios:
// // ...
// router.get("/", userController.index);
// router.get("/crear", userController.create);
// router.get("/", userController.store);
// router.get("/:id", userController.show);
// router.get("/:id/editar", userController.edit);
// router.get("/:id", userController.update);
// router.get("/:id", userController.destroy);

// Rutas del register
router.get("/registro",userController.showRegister);
router.post("/registro",userController.postRegister);
// Rutas del login
router.get("/login",userController.showLogin);
//router.post("/login",userController.postLogin);
// Ruta de logout
//router.get("/logout",userController.showLogout)




module.exports = router;
