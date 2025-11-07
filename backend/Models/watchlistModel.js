const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
    required: true,
    trim: true,
  },
});

const WatchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  watchlist: [MovieSchema],
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);
