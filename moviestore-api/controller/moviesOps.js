const Movie = require("../model/Movie");

const getAllMovies = async (parameters) => {
  const {
    title,
    rating,
    q,
    page = 1,
    limit = 10,
    sort,
    order = 1,
  } = parameters;

  const query = {};
  if (title) {
    query.title = title;
  }
  if (rating) {
    query.rating = rating;
  }

  const sortQuery = {};
  if (sort) {
    sortQuery[`${sort}`] = order;
  }

  const movies = await Movie.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort(sortQuery);

  return movies;
};

const textSearchMovie = async (q) => {
  const searchResult = await Movie.find({ $text: { $search: `\"${q}\"` } });

  return searchResult;
};

const addMovie = async (movie) => {
  const addedMovie = await Movie.create({ ...movie });

  return addedMovie;
};

const updateMovie = async (id, movie) => {
  const { title, language, isAdult, release_date, rating, genres } = movie;

  await Movie.findByIdAndUpdate(id, {
    $set: { title, language, isAdult, release_date, rating, genres },
  });

  const updatedMovie = await Movie.findById(id);

  return updatedMovie;
};

const deleteMovie = async (id) => {
  const deletedMovie = await Movie.findByIdAndDelete(id);

  return deletedMovie;
};

module.exports = {
  getAllMovies,
  textSearchMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
