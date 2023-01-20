const mongoose = require("mongoose");

const Movie = mongoose.model("Movie", {
  title: String,
  language: String,
  isAdult: Boolean,
  release_date: String,
  rating: Number,
  genres: [String],
});

module.exports = Movie;
