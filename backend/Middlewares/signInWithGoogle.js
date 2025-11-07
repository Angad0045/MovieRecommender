const axios = require("axios");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { oauth2client } = require("../Config/googleConfig");
const userModel = require("../Models/userModel");

const signInWithGoogle = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res
        .status(400)
        .json({ message: "Authorization code is required" });
    }

    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
    );

    const { name, email, picture } = userRes.data;
    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({
        name,
        email,
        image: picture,
      });
    }

    const token = await user.createJWTToken();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 900000),
    });

    res.status(200).json({
      message: "Success",
      user,
    });
  } catch (err) {
    console.error(
      "Google Sign-In error:",
      err.response?.data || err.message || err
    );
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = { signInWithGoogle };
