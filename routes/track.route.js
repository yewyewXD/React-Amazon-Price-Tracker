const express = require("express");
const router = express.Router();
const {
  getTracks,
  postTrack,
  deleteTrack,
} = require("../controllers/track.controller");
const auth = require("../middleware/auth");

router.get("/tracks", auth, getTracks);
router.post("/track", auth, postTrack);
router.delete("/track/:id", auth, deleteTrack);

module.exports = router;
