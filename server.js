const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
const trackRouter = require("./routes/track");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/track", trackRouter);
// port
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
