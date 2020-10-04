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

    console.log("crawling starts");

    // crawl Amazon product
    const crawledProduct = await nightmare
      .goto(trackUrl)
      .wait("#landingImage")
      .evaluate(() => {
        const image = document.getElementById("landingImage").src;
        const price = document.getElementById("priceblock_ourprice");
        const salePrice = document.getElementById("priceblock_saleprice");
        if (price !== null) {
          const actualPrice = +price.innerText.substring(1);
          return {
            actualPrice,
            image,
          };
        } else if (salePrice !== null) {
          const actualPrice = +salePrice.innerText.substring(1);
          return {
            actualPrice,
            image,
          };
        } else {
          return {
            actualPrice: 0,
            image,
          };
        }
      })
      .end();

    console.log("crawling ends");
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
