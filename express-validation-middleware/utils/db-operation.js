const { Level } = require("level");

const movieDb = new Level("movies", { valueEncoding: "json" });

const getAllMovies = async () => {
  const movies = await movieDb.iterator().all();

  return movies;
};

const addMovie = async (movie) => {
  await movieDb.put(movie.id, movie);
  return movie;
};

module.exports = {
  getAllMovies,
  addMovie,
};
