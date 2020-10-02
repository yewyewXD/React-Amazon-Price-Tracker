const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  createdTracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tracks",
    },
  ],
});

module.exports = mongoose.model("Users", userSchema);
