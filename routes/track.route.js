const express = require("express");
const router = express.Router();
const {
  getAllTracks,
  postTrack,
  deleteTrack,
} = require("../controllers/track.controller");

router.route("/tracks").post(getAllTracks);
router.route("/track").post(postTrack);
router.route("/track/:id").delete(deleteTrack);

module.exports = router;
