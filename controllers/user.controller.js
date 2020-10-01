const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Register user
// @route POST /user/register
// @access public
exports.registerUser = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  try {
    // check if all field is entered
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Please enter all field",
      });
    }

    // check if email already exists
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

    // check if both passwords match
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
    return res.status(500).json(err);
  }
};

// @desc Login user
// @route POST /user/login
// @access public
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // check if user exists
    const existingEmail = await User.findOne({ email: user });
    if (!existingEmail) {
      return res.status(400).json({
        success: false,
        error: "User does not exist",
      });
    }

    // use email: check password
    if (existingEmail) {
      const verified = await bcrypt.compare(password, existingEmail.password);
      if (!verified) {
        return res.status(400).json({
          success: false,
          error: "Password is incorrect",
        });
      }
      return res.status(201).json({
        success: true,
        data: { userId: existingEmail.id, username: existingEmail.username },
      });
    }

    // authenticate user
    // const jwtToken = jwt.sign(
    //   { userId: existingUser.id, email: existingUser.email },
    //   "privatekey",
    //   {
    //     expiresIn: "2h",
    //   }
    // );
  } catch (err) {
    return res.status(500).json(err);
  }
};
