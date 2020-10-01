const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("user-auth-token");
  if (!token) {
    return res.status(401).json({ error: "No authentication token" });
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) {
    return res.status(401).json({ error: "Token verification failed" });
  }

  console.log(verified);
};

module.exports = auth;
