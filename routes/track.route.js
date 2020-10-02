const express = require("express");
const router = express.Router();
const {
  postTrack,
  deleteTrack,
  editTrack,
} = require("../controllers/track.controller");

router.route("/track").post(postTrack);
router.route("/track/:id").delete(deleteTrack).post(editTrack);

module.exports = router;
