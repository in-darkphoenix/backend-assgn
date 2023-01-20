const express = require("express");

const {
  getAllMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  textSearchMovie,
} = require("../controller/moviesOps");

const movieRouter = express.Router();

movieRouter.get("/movie", async (req, res) => {
  try {
    const movies = await getAllMovies(req.query);

    res.send({
      ALL_MOVIES: movies,
    });
  } catch (err) {
    console.error(err);

    res.status(500).send({ message: "Unexpected Error" });
  }
});

movieRouter.get("/movie/search", async (req, res) => {
  try {
    const { q } = req.query;
    const searchResult = await textSearchMovie(q);

    res.send({
      SEARCH_RESULTS: searchResult,
    });
  } catch (err) {
    console.error(err);

    res.status(500).send({ message: "Unexpected Error" });
  }
});

movieRouter.post("/movie", async (req, res) => {
  try {
    const addedMovie = await addMovie(req.body);

    res.status(201).send({ ADDED_MOVIE: addedMovie });
  } catch (err) {
    console.error(err);

    res.status(500).send({ message: "Unexpected Error" });
  }
});

movieRouter.patch("/movie/:id", async (req, res) => {
  try {
    const updatedMovie = await updateMovie(req.params.id, req.body);

    res.send({ UPDATED_MOVIE: updatedMovie });
  } catch (err) {
    console.error(err);

    if (err.message === "Movie with the given id doesn't exist") {
      res.status(404).send({
        message: err.message,
      });
    }

    res.status(500).send({
      message: "Unexpected Error",
    });
  }
});

movieRouter.delete("/movie/:id", async (req, res) => {
  try {
    const deletedMovie = await deleteMovie(req.params.id);

    res.send({ DELETED_MOVIE: deletedMovie });
  } catch (err) {
    console.error(err);

    if (err.message === "Movie with the given id doesn't exist") {
      res.status(404).send({
        message: err.message,
      });
    }

    res.status(500).send({
      message: "Unexpected Error",
    });
  }
});

module.exports = movieRouter;
