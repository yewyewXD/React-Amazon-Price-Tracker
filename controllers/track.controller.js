const Track = require("../models/Track");
const User = require("../models/User");
const nightmare = require("nightmare")();

// @desc Add track
// @route POST /api/dashboard/track
// @access private
exports.postTrack = async (req, res, next) => {
  try {
    const { userId, trackUrl, name, expectedPrice } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User does not exist",
      });
    }

    console.log("crawling starts");

    // crawl Amazon product
    let crawledProduct = {};

    // image check
    const imageExist = await nightmare
      .goto(trackUrl)
      .wait(3500)
      .exists("img#landingImage");

    if (imageExist) {
      console.log("found image");
      const image = await nightmare
        .goto(trackUrl)
        .wait("img#landingImage")
        .evaluate(() => document.getElementById("landingImage").src);
      crawledProduct.image = image;
    }

    // price check 1
    if (!crawledProduct.actualPrice) {
      const ourPriceExist = await nightmare
        .goto(trackUrl)
        .wait(3500)
        .exists("span#priceblock_ourprice");

      if (ourPriceExist) {
        console.log("found our price");
        const ourPrice = await nightmare
          .goto(trackUrl)
          .wait("span#priceblock_ourprice")
          .evaluate(
            () =>
              +document
                .getElementById("priceblock_ourprice")
                .innerText.substring(1)
          )
          .end();
        crawledProduct.actualPrice = ourPrice;
      }
    }

    // price check 2
    if (!crawledProduct.actualPrice) {
      const salePriceExist = await nightmare
        .goto(trackUrl)
        .wait(3500)
        .exists("span#priceblock_saleprice");

      if (salePriceExist) {
        console.log("found sale price");
        const salePrice = await nightmare
          .goto(trackUrl)
          .wait("span#priceblock_saleprice")
          .evaluate(
            () =>
              +document
                .getElementById("priceblock_saleprice")
                .innerText.substring(1)
          )
          .end();

        crawledProduct.actualPrice = salePrice;
      }
    }

    // price check 3
    if (!crawledProduct.actualPrice) {
      const dealPriceExist = await nightmare
        .goto(trackUrl)
        .wait(3500)
        .exists("span#priceblock_dealprice");

      if (dealPriceExist) {
        console.log("found deal price");
        const dealPrice = await nightmare
          .goto(trackUrl)
          .wait("span#priceblock_dealprice")
          .evaluate(
            () =>
              +document
                .getElementById("priceblock_dealprice")
                .innerText.substring(1)
          )
          .end();
        crawledProduct.actualPrice = dealPrice;
      }
    }

    // final price check
    if (!crawledProduct.actualPrice) {
      crawledProduct.actualPrice = 0;
    }

    console.log("crawling ends");

    // // create track
    const newTrack = {
      image: crawledProduct.image,
      name,
      expectedPrice,
      actualPrice: crawledProduct.actualPrice,
      creator: user._id,
    };

    const track = await Track.create(newTrack);
    user.createdTracks.unshift(track._id);
    user.save();

    return res.status(201).json({
      success: true,
      data: track,
    });
  } catch (err) {
    console.log("crawling failed");
    return res.status(500).json({ error: err.message });
  }
};

// @desc Edit track
// @route POST /api/dashboard/track/:id
// @access private
exports.editTrack = async (req, res, next) => {
  try {
    const { name, expectedPrice } = req.body;
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(401).json({
        success: false,
        error: "No track found",
      });
    }

    track.name = name;
    track.expectedPrice = expectedPrice;
    await track.save();

    return res.status(201).json({
      success: true,
      edited: track,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @desc Delete track
// @route POST /api/dashboard/delete/tracks
// @access private
exports.deleteTracks = async (req, res, next) => {
  try {
    const { trackIds } = req.body;
    const tracks = await Track.find({ _id: { $in: trackIds } });

    if (!tracks) {
      return res.status(401).json({
        success: false,
        error: "No track found",
      });
    }

    await Track.deleteMany({
      _id: { $in: trackIds },
    });

    return res.status(201).json({
      success: true,
      deleted: tracks,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
