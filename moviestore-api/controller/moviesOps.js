const Movie = require("../model/Movie");

const getAllMovies = async () => {
  const movies = await Movie.find();

  return movies;
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

module.exports = { getAllMovies, addMovie, updateMovie, deleteMovie };
