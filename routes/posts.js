const express = require("express");
const postsRouter = express.Router();
const verify = require("./tokenVerify");

//import the Posts collection
const Post = require("../models/posts");

//get all posts
postsRouter.get("/", verify, async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

postsRouter.param("postId", verify, async (req, res, next, postId) => {
  try {
    req.post = await Post.findOne({ _id: postId });
    next();
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

//get a specific post
postsRouter.get("/:postId", verify, (req, res) => {
  res.status(200).json({ post: req.post });
});

//make a post
postsRouter.post("/", verify, async (req, res) => {
  const post = new Post({
    title: req.body.posts.title,
    description: req.body.posts.description,
  });

  try {
    const savedPost = await post.save();
    res.status(201).json({ savedPost });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

//edit a post
postsRouter.patch("/:postId", verify, async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { description: req.body.posts.description } }
    );
    res.status(200).json({ updatedPost });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

//delete all posts
postsRouter.delete("/", verify, async (req, res) => {
  try {
    const deleteDetails = await Post.deleteMany();
    res.status(200).json({ deleteDetails });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//delete a specific post
postsRouter.delete("/:postId", verify, async (req, res) => {
  try {
    const deletedPost = await Post.deleteOne({ _id: req.params.postId });
    if (deletedPost["deletedCount"] !== 0) {
      res.status(200).json({ deletedPost });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

module.exports = postsRouter;
