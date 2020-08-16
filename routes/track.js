const express = require("express");
const router = express.Router();
const nightmare = require("nightmare")();

router.route("/").post(async (req, res) => {
  const { url, email, minPrice } = req.body;
  res.json(req.body);

  const priceString = await nightmare
    .goto(url)
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();

  const priceNumber = parseFloat(priceString.replace("$", ""));
  if (priceNumber < minPrice) {
    res.json("cheap");
  } else {
    res.json("expensive");
  }

  // const mcData = {
  //   members: [
  //     {
  //       email_address: email,
  //       status: "pending", // use "subscribed" if no verification needed
  //     },
  //   ],
  // };
  // const mcDataPost = JSON.stringify(mcData);

  // const options = {
  //   url: "",
  //   method: "POST",
  //   headers: {
  //     Authorization: "auth...",
  //   },
  //   body: mcDataPost,
  // };
});

module.exports = router;
