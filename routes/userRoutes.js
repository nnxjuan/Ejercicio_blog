const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");
const lectorRole = require("../middlewares/lectorRole");
router.use(makeUserAvailableInViews);

// Rutas del register
router.get("/registro", userController.showRegister);
router.post("/registro", userController.postRegister);
// Rutas del login
router.get("/login", userController.showLogin);
router.post("/login", userController.postLogin);
// Ruta de logout
router.get("/logout", userController.showLogout);

module.exports = router;
