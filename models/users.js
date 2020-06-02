const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    unique: true,
  },
  email: { type: String, required: true, minlength: 6 },
  password: { type: String, required: true, max: 1024, minlength: 6 },
  about: { type: String, maxlength: 1024 },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
