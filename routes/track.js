const express = require("express");
const router = express.Router();
const nightmare = require("nightmare")();
const fetch = require("node-fetch");
require("dotenv").config();

router.route("/").post(async (req, res) => {
  const { url, email, minPrice } = req.body;

  const priceString = await nightmare
    .goto(url)
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();

  const priceNumber = parseFloat(priceString.replace("$", ""));

  res.json({
    message: `Current Price: $${priceNumber} Desired Price: $${minPrice}`,
  });

  // Check: hit price requirement
  if (priceNumber < minPrice) {
    console.log("cheap");
  } else {
    console.log("expensive");
  }
});

module.exports = router;
