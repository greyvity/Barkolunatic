const express = require("express");
const usersRouter = express.Router();

//import the users collection
const User = require("../models/users");

//get all users
usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

usersRouter.param("userId", async (req, res, next, userId) => {
  try {
    req.user = await User.findOne({ _id: userId });
    next();
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

//get a specific user
usersRouter.get("/:userId", (req, res) => {
  res.status(200).json({ user: req.user });
});

//make a user
usersRouter.post("/", async (req, res) => {
  const user = new user({
    title: req.body.users.title,
    description: req.body.users.description,
  });

  try {
    const saveduser = await User.save();
    res.status(201).json({ saveduser });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

//edit a user
usersRouter.patch("/:userId", async (req, res) => {
  try {
    const updateduser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { description: req.body.users.description } }
    );
    res.status(200).json({ updateduser });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

//delete all users
usersRouter.delete("/", async (req, res) => {
  try {
    const deleteDetails = await User.deleteMany();
    res.status(200).json({ deleteDetails });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//delete a specific user
usersRouter.delete("/:userId", async (req, res) => {
  try {
    const deleteduser = await User.deleteOne({ _id: req.params.userId });
    if (deleteduser["deletedCount"] !== 0) {
      res.status(200).json({ deleteduser });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

module.exports = usersRouter;
