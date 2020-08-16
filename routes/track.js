const express = require("express");
const router = express.Router();
const nightmare = require("nightmare")();

router.route("/").post(async (req, res) => {
  const { url, email, minPrice, redirect } = req.body;
  console.log(req.body);

  // const priceString = await nightmare
  //   .goto(url)
  //   .wait("#priceblock_ourprice")
  //   .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
  //   .end();

  // const priceNumber = parseFloat(priceString.replace("$", ""));
  // if (priceNumber < minPrice) {
  //   console.log("cheap");
  // } else {
  //   console.log("expensive");
  // }

  // const mcData = {
  //   members:[
  //     {
  //       email_address: email,
  //       status,
  //     }
  //   ]
  // }

  res.json("track success");
});

module.exports = router;
