const express = require("express");
const authRouter = express.Router();
const User = require("../models/users");
const { registerValidation, loginValidation } = require("../validate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./tokenVerify");

//register routes
authRouter.post("/register", async (req, res) => {
  //checking if the data is valid
  const { error } = registerValidation(req.body.auth);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    //checking if the email or username exists already in the database
    const emailExists = await User.findOne({ email: req.body.auth.email });
    if (emailExists)
      return res.status(400).json({ message: "email already exists" });
    const usernameExists = await User.findOne({
      username: req.body.auth.username,
    });
    if (usernameExists)
      return res.status(400).json({ message: "Username already exists" });

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.auth.password, salt);
    //creating new user
    const user = new User({
      username: req.body.auth.username,
      email: req.body.auth.email,
      password: hashedPassword,
      about: req.body.auth.about,
    });

    //saving the new user
    try {
      const savedUser = await user.save();
      res.status(201).json({ user: savedUser._id });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
});

//login Routes
authRouter.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body.auth);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.auth.email });
  if (!user) return res.status(400).json({ message: "email doesn't exist" });
  const validPassword = await bcrypt.compare(
    req.body.auth.password,
    user.password
  );
  if (!validPassword)
    return res.status(400).json({ message: "Incorrect password" });

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json({ user });
});

//get particular user from the token
authRouter.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }, { password: 0 });
    res.status(200).json({ user });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = authRouter;
