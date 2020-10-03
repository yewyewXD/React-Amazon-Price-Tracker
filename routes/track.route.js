const express = require("express");
const router = express.Router();
const {
  postTrack,
  deleteTracks,
  editTrack,
} = require("../controllers/track.controller");

router.route("/track").post(postTrack);
router.route("/track/:id").post(editTrack);
router.route("/delete/tracks").post(deleteTracks);

module.exports = router;
