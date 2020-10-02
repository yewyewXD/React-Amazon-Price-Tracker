const Track = require("../models/Track");
const User = require("../models/User");
// const { cloudinary } = require("../utils/cloudinary");
const nightmare = require("nightmare")();

// @desc Add track
// @route POST /api/dashboard/track
// @access private
exports.postTrack = async (req, res, next) => {
  try {
    const { userId, trackUrl, name, expectedPrice } = req.body;

    // check user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User does not exist",
      });
    }

    // crawl Amazon product
    const crawledProduct = await nightmare
      .goto(trackUrl)
      .wait("#landingImage")
      .evaluate(() => {
        const image = document.getElementById("landingImage").src;
        const price = document.getElementById("priceblock_ourprice");
        const salePrice = document.getElementById("priceblock_saleprice");
        if (!price) {
          const actualPrice = +salePrice.innerText.substring(1);
          return {
            actualPrice,
            image,
          };
        } else {
          const actualPrice = +price.innerText.substring(1);
          return {
            actualPrice,
            image,
          };
        }
      })
      .end();

    // // // upload track image to cloud database
    // // const { url: cloudinaryUrl } = await cloudinary.uploader.upload(image, {
    // //   upload_preset: "trackerBase",
    // // });

    // // create track
    const newTrack = {
      image: crawledProduct.image,
      name,
      expectedPrice,
      actualPrice: crawledProduct.actualPrice,
      creator: user._id,
    };

    const track = await Track.create(newTrack);
    user.createdTracks.push(track._id);
    user.save();

    return res.status(201).json({
      success: true,
      data: track,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @desc Delete track
// @route POST /api/dashboard/track/:id
// @access private
exports.deleteTrack = async (req, res, next) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(401).json({
        success: false,
        error: "No track found",
      });
    }

    await track.remove();

    return res.status(201).json({
      success: true,
      deleted: track,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
