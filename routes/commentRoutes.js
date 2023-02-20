const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const articleController = require("../controllers/articleController");
const lectorRole = require("../middlewares/lectorRole");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

router.use(makeUserAvailableInViews);
router.use(lectorRole);

router.post("/article/:id", articleController.createComment);

router.get("/edit/:id", articleController.editComment);
router.post("/edit/:id", articleController.updateComment);

module.exports = router;
