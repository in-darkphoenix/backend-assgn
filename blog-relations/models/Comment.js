const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  blog_id: String,
  user_id: String,
  message: String,
  rating: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
