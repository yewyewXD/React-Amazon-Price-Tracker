const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
