const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: String,
  body: String,
  category_ids: [String],
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
