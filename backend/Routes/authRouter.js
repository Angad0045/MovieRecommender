const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const validator = require("validator");
const User = require("../Models/userModel");
const { signInWithGoogle } = require("../Middlewares/signInWithGoogle");
const { userAuth } = require("../Middlewares/userAuth");
const authRouter = express.Router();

authRouter.post("/signInWithGoogle", signInWithGoogle);

authRouter.post("/signUpWithEmailPassword", async (req, res) => {
  try {
    const { username, email, password } = req?.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const addUser = new User({
      name: username,
      email,
      password: hashPassword,
    });

    const newUser = await addUser.save();

    const token = await newUser.createJWTToken();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 900000),
    });

    res.status(200).json({
      message: "New user added successfully!",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

authRouter.post("/signInWithEmailPassword", async (req, res) => {
  try {
    const { email, password } = req?.body;
    if (!validator.isEmail(email))
      throw new Error("Enter a valid email address");

    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User not found");

    const checkPassword = await user.verifyPassword(password);

    if (!checkPassword) throw new Error("Incorrect Password");

    const token = await user.createJWTToken();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 900000),
    });

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "none",
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    res.status(200).json({
      message: "User login successfully!",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("User login successfully!");
});

authRouter.get("/user", userAuth, async (req, res) => {
  try {
    const user = req?.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong", err);
  }
});

module.exports = authRouter;
