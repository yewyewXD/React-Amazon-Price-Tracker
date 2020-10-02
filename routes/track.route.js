const express = require("express");
const router = express.Router();
const {
  getTracks,
  postTrack,
  deleteTrack,
} = require("../controllers/track.controller");

router.route("/tracks").get(getTracks);
router.route("/track").post(postTrack);
router.route("/track/:id").delete(deleteTrack);

module.exports = router;
