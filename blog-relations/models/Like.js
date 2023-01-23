const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  user_id: String,
  blog_id: String,
  emoji: String,
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
