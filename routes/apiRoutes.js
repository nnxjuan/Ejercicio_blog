const express = require("express");
const { expressjwt: checkJwt } = require("express-jwt");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.post("/tokens", apiController.tokens);

router.use(checkJwt({ secret: process.env.TOKEN, algorithms: ["HS256"] }));

router.get("/articles", apiController.index);
router.put("/create", apiController.create);
router.patch("/edit", apiController.edit);
module.exports = router;
