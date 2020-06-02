const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1024,
    },
  },
  { timestamp: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
