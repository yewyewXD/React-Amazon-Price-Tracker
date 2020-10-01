const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  deleteUser,
} = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.delete("/delete", auth, deleteUser);

module.exports = router;
