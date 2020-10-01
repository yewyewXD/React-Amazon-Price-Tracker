const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("user-auth-token");
    if (!token) {
      return res.status(401).json({ error: "No authentication token" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ error: "Token verification failed" });
    }

    req.user = verified.userId;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
