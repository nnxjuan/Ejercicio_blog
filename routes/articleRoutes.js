const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const authorCanEdit = require("../middlewares/authorCanEdit");
const isAuthenticated = require("../middlewares/isAuthenticated");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

router.use(makeUserAvailableInViews);
router.use(isAuthenticated);

router.get("/", articleController.index);
router.get("/article/:id", articleController.show);
router.get("/admin", articleController.admin);

module.exports = router;
