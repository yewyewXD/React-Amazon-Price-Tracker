const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Register user
// @route POST /user/register
// @access public
exports.registerUser = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  try {
    // Validation
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Please enter all field",
      });
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        success: false,
        error: "This email has been used",
      });
    }
    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        error: "Password needs to be at least 5 characters long",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Passwords do not match",
      });
    }

    // encrypt and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const userInfo = {
      email,
      password: hashedPassword,
    };
    await User.create(userInfo);

    return res.status(201).json({
      success: true,
      data: { email },
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// @desc Login user
// @route POST /user/login
// @access public
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Validation
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        error: "User does not exist",
      });
    }
    const verified = await bcrypt.compare(password, existingUser.password);
    if (!verified) {
      return res.status(400).json({
        success: false,
        error: "Password is incorrect",
      });
    }

    // authenticate user
    const jwtToken = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res.status(201).json({
      success: true,
      data: {
        token: jwtToken,
        user: {
          id: existingUser.id,
          email: existingUser.email,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// @desc Delete user
// @route POST /user/delete
// @access private
exports.deleteUser = async (req, res, next) => {};
