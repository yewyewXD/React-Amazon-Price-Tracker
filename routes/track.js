const express = require("express");
const router = express.Router();
const nightmare = require("nightmare")();

router.route("/").post(async (req, res) => {
  const url = req.body.url;
  const minPrice = req.body.price;
  console.log(req.body);

  const priceString = await nightmare
    .goto(url)
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();

  const priceNumber = parseFloat(priceString.replace("$", ""));
  if (priceNumber < minPrice) {
    console.log("cheap");
  } else {
    console.log("expensive");
  }

  res.json("successfully get the url");
});

module.exports = router;
