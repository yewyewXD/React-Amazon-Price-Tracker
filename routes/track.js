const express = require("express");
const router = express.Router();
const nightmare = require("nightmare")();
const fetch = require("node-fetch");
require("dotenv").config();

router.route("/").post(async (req, res) => {
  const { url, email, minPrice } = req.body;
  console.log(req.body);

  const priceString = await nightmare
    .goto(url)
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();

  const priceNumber = parseFloat(priceString.replace("$", ""));
  if (priceNumber < minPrice) {
    // MailChimp
    const mcData = {
      members: [
        {
          email_address: email,
          status: "pending", // use "subscribed" if no verification needed
        },
      ],
    };
    const mcDataPost = JSON.stringify(mcData);

    fetch("https://us17.api.mailchimp.com/3.0/lists/b4dcb74039", {
      method: "POST",
      headers: {
        Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
      },
      body: mcDataPost,
    })
      .then((res) => {
        console.log(res.data);
        console.log("it is working");
      })
      .catch((err) => {
        console.log(err);
      });

    res.json({ message: "it's cheap", body: req.body });
  } else {
    res.json({ status: "it's expensive" });
    console.log("expensive");
  }
});

module.exports = router;
