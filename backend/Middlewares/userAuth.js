const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(501).send("Token not found!");

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decoded;

    // Find user
    const user = await userModel.findById(_id);
    if (!user) return res.status(501).send("User not found");

    // Send success response
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    // Handle token errors properly
    if (err.name === "JsonWebTokenError") {
      return res.status(501).send("Invalid token");
    }
    if (err.name === "TokenExpiredError") {
      return res.status(501).send("Token expired");
    }
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  userAuth,
};
