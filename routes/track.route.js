const express = require("express");
const router = express.Router();
const {
  postTrack,
  deleteTracks,
  editTrack,
  multiTrack,
} = require("../controllers/track.controller");

router.route("/track").post(postTrack);
router.route("/track/:id").post(editTrack);
router.route("/delete/tracks").post(deleteTracks);
router.route("/multiTrack").post(multiTrack);

module.exports = router;
