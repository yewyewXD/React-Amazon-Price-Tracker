const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// middleware
const app = express();
dotenv.config({ path: "./config/config.env" });
connectDB();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// routes
const userRoute = require("./routes/user.route");
app.use("/api/user", userRoute);
const trackRoute = require("./routes/track.route");
app.use("/api/dashboard", trackRoute);

// port
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
