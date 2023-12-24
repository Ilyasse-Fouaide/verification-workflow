const express = require("express");
const auth = require("../controllers/auth.controller");
const authorize = require("../middlewares/authorize");
const router = express.Router();

router.route("/register").post(auth.register);
router.route("/login").post(auth.login);
router.route("/profile").get(authorize, auth.profile);

module.exports = router;
