const express = require("express");
const { userAuth } = require("../Middlewares/userAuth");
const watchListModel = require("../Models/watchListModel");
const watchlistRouter = express.Router();

watchlistRouter.post("/addToWatchlist/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, posterPath } = req?.body;
    const user = req.user._id;

    let movieList = await watchListModel.findOne({ userId: user });

    if (!movieList) {
      movieList = new watchListModel({
        userId: user,
        watchlist: [{ id, name, posterPath }],
      });
    } else {
      const alreadyExists = movieList.watchlist.some(
        (item) => item.id.toString() === id.toString()
      );

      if (alreadyExists) {
        return res
          .status(500)
          .json({ message: "Movie already exists in watchlist" });
      }
      movieList.watchlist.push({ id, name, posterPath });
    }
    await movieList.save();
    res.json(movieList);
  } catch (err) {
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

watchlistRouter.delete(
  "/removeFromWatchlist/:id",
  userAuth,
  async (req, res) => {
    try {
      const { id } = req?.params;
      const user = req.user._id;

      // Remove the movie
      const updatedList = await watchListModel.findOneAndUpdate(
        { userId: user },
        { $pull: { watchlist: { id: id } } },
        { new: true }
      );
      res.json({
        message: "Movie removed from watchlist successfully",
        data: updatedList,
      });
    } catch (err) {
      res.status(500).json({ error: err.message || "Something went wrong" });
    }
  }
);

watchlistRouter.get("/getWatchlist", userAuth, async (req, res) => {
  const user = req?.user?._id;

  const usersWatchlist = await watchListModel.findOne({ userId: user });

  if (!usersWatchlist || !usersWatchlist.watchlist.length) {
    return res.status(501).send({ message: "Watchlist is empty" });
  }
  res.json({
    message: "Watchlist fetched successfully",
    watchlist: usersWatchlist.watchlist,
  });
});

module.exports = watchlistRouter;
