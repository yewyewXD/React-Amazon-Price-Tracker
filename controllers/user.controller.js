const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Register user
// @route POST /api/user/register
// @access public
exports.registerUser = async (req, res, next) => {
  try {
    const { displayName, email, password, confirmPassword } = req.body;

    // Validation
    if (!displayName || !email || !password || !confirmPassword) {
      return res.status(401).json({
        success: false,
        error: "Please enter all field",
      });
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(401).json({
        success: false,
        error: "This email has been used",
      });
    }
    if (password.length < 5) {
      return res.status(401).json({
        success: false,
        error: "Password needs to be at least 5 characters long",
      });
    }
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        error: "Passwords do not match",
      });
    }

    // encrypt and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const userInfo = {
      displayName,
      email,
      password: hashedPassword,
    };
    await User.create(userInfo);

    return res.status(201).json({
      success: true,
      data: { displayName, email }, // not used in client side
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @desc Login user
// @route POST /api/user/login
// @access public
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    const user = await User.findOne({ email }).populate("createdTracks");
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User does not exist",
      });
    }

    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
      return res.status(401).json({
        success: false,
        error: "Password is incorrect",
      });
    }

    // authenticate user
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
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
          userId: user.id,
          displayName: user.displayName,
          email: user.email,
          createdTracks: user.createdTracks,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @desc Delete user
// @route POST /api/user/delete
// @access private
exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);

    return res.status(201).json({
      success: true,
      deleted: deletedUser,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @desc Validate token
// @route POST /api/user/tokenIsValid
// @access public
exports.validateToken = async (req, res, next) => {
  try {
    const token = req.header("user-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.userId);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @desc Get user with validated token
// @route GET /api/user/
// @access private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).populate("createdTracks");
    res.json({
      userId: user.id,
      displayName: user.displayName,
      email: user.email,
      createdTracks: user.createdTracks,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
