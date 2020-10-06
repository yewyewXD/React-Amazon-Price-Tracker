const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const compression = require("compression");

// middleware
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
const auth = require("./middleware/auth");

// routes
const userRoute = require("./routes/user.route");
app.use("/api/user", userRoute);
const trackRoute = require("./routes/track.route");
app.use("/api/dashboard", auth, trackRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

// port
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${
      process.env.NODE_ENV || "development"
    } on port ${PORT}`
  )
);
