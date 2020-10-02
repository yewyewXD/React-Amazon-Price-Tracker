const Track = require("../models/Track");
const User = require("../models/User");
// const { cloudinary } = require("../utils/cloudinary");
const nightmare = require("nightmare")();

// @desc Get all tracks
// @route GET /api/dashboard/tracks
// @access private
exports.getTracks = async (req, res, next) => {
  try {
    const tracks = await Track.find().populate("creator");

    return res.status(200).json({
      success: true,
      length: tracks.length,
      data: tracks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc Add track
// @route POST /api/dashboard/track
// @access private
exports.postTrack = async (req, res, next) => {
  try {
    // const { userId, trackUrl, name, expectedPrice } = req.body;

    return res.status(201).json({
      success: true,
      data: "test data",
    });

    // // check user
    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(401).json({
    //     success: false,
    //     error: "User does not exist",
    //   });
    // }

    // // use nightmare to crawl Amazon product price
    // const actualPriceStr = await nightmare
    //   .goto(trackUrl)
    //   .wait("#priceblock_ourprice")
    //   .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    //   .end();
    // const actualPrice = +actualPriceStr.substring(1);

    // // use nightmare to crawl Amazon product image
    // const imageUrl = await nightmare
    //   .goto(trackUrl)
    //   .wait("#landingImage")
    //   .evaluate(() => document.getElementById("landingImage").src)
    //   .end();

    // // // upload track image to cloud database
    // // const { url: cloudinaryUrl } = await cloudinary.uploader.upload(image, {
    // //   upload_preset: "trackerBase",
    // // });

    // // create track
    // const newTrack = {
    //   image: imageUrl,
    //   name,
    //   expectedPrice,
    //   actualPrice,
    //   creator: user._id,
    // };

    // const track = await Track.create(newTrack);
    // user.createdTracks.push(track._id);
    // user.save();

    // return res.status(201).json({
    //   success: true,
    //   data: {
    //     user: user.displayName,
    //     track,
    //   },
    // });
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
