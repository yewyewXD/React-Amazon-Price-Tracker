const Track = require("../models/Track");
const User = require("../models/User");
const puppeteer = require("puppeteer");

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

    // crawl Amazon product
    console.log("crawling starts");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(trackUrl, { waitUntil: "networkidle2" });

    const crawledProduct = await page.evaluate(() => {
      let actualPrice = 0;

      const image = document.querySelector("#landingImage").src;
      const ourPrice = document.querySelector("#priceblock_ourprice");
      const salePrice = document.querySelector("#priceblock_saleprice");
      const dealPrice = document.querySelector("#priceblock_dealprice");

      if (ourPrice) {
        actualPrice = +ourPrice.innerText.substring(1);
      } else if (salePrice) {
        actualPrice = +salePrice.innerText.substring(1);
      } else if (dealPrice) {
        actualPrice = +dealPrice.innerText.substring(1);
      }

      return {
        image,
        actualPrice,
      };
    });

    console.log("crawling ends");
    await browser.close();

    // // create track
    const newTrack = {
      productUrl: trackUrl,
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

// @desc Run multiple tracks
// @route POST /api/dashboard/multiTrack
// @access private
exports.multiTrack = async (req, res, next) => {
  try {
    const { userId, createdTracks } = req.body;
    const trackIds = createdTracks.map((createdTrack) => createdTrack._id);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User does not exist",
      });
    }

    // loop through each track START
    createdTracks.forEach(async (createdTrack) => {
      const existingTrack = await Track.findById(createdTrack._id);
      if (!existingTrack) {
        return res.status(401).json({
          success: false,
          error: "No track found",
        });
      }

      // crawl Amazon product
      console.log(`${createdTrack.name} crawling starts`);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(createdTrack.productUrl, { waitUntil: "networkidle2" });

      const crawledProduct = await page.evaluate(() => {
        let actualPrice = 0;

        const image = document.querySelector("#landingImage").src;
        const ourPrice = document.querySelector("#priceblock_ourprice");
        const salePrice = document.querySelector("#priceblock_saleprice");
        const dealPrice = document.querySelector("#priceblock_dealprice");

        if (ourPrice) {
          actualPrice = +ourPrice.innerText.substring(1);
        } else if (salePrice) {
          actualPrice = +salePrice.innerText.substring(1);
        } else if (dealPrice) {
          actualPrice = +dealPrice.innerText.substring(1);
        }

        return {
          image,
          actualPrice,
        };
      });
      console.log(`${createdTrack.name} crawling ends`);
      await browser.close();

      const { image, actualPrice } = crawledProduct;

      if (existingTrack.image !== image) {
        existingTrack.image = image;
        await existingTrack.save();
      }

      if (existingTrack.actualPrice !== actualPrice) {
        existingTrack.actualPrice = actualPrice;
        await existingTrack.save();
      }
    });
    // loop through each track END

    const tracks = await Track.find({ _id: { $in: trackIds } });

    return res.status(201).json({
      success: true,
      data: tracks,
    });
  } catch (err) {
    console.log("crawling failed");
    return res.status(500).json({ error: err.message });
  }
};
