const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  deleteUser,
  validateToken,
} = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.delete("/delete", auth, deleteUser);
router.route("/tokenIsValid").post(validateToken);

module.exports = router;
