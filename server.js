const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/track", (req, res) => {
  const url = req.body.url;
  const price = req.body.price;
  console.log(req.body);
  res.json("successfully get the url");
});
// port
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
