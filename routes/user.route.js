const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  deleteUser,
  validateToken,
  getUser,
} = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.delete("/delete", auth, deleteUser);
router.route("/tokenIsValid").post(validateToken);
router.get("/", auth, getUser);

module.exports = router;
