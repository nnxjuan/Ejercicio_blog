const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const admController = require("../controllers/admController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const admRole = require("../middlewares/admRole");
const escritorRole = require("../middlewares/escritorRole");
const { expressjwt: checkJwt } = require("express-jwt");

router.use(isAuthenticated);

router.get("/admin", articleController.admin);
router.get("/admin/create", articleController.create);
router.post("/admin/create", articleController.store);
router.get("/admin/edit/:id", articleController.edit);
router.post("/admin/edit/:id", articleController.update);
router.get("/admin/delet/:id", articleController.destroy);

router.get("/admin/users", admRole, admController.index);
router.get("/user/edit/:id", admRole, admController.edit);
router.post("/user/edit/:id", admRole, admController.update);
router.get("/user/delete/:id", admRole, admController.destroy);
module.exports = router;
