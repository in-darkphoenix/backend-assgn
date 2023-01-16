const express = require("express");
const validate = require("./middlewares/validate");
const { getAllMovies, addMovie } = require("./utils/db-operation");

const app = express();

app.use(express.json());

app.get("/movies", async (req, res) => {
  try {
    const movies = await getAllMovies();
    res.send({
      MOVIES: movies,
    });
  } catch (err) {
    console.error(err);

    res.status(500).send({
      message: "Unexpected Error",
    });
  }
});

app.post("/movies", validate, async (req, res) => {
  try {
    const addedMovie = await addMovie(req.body);
    res.status(201).send({
      ADDED_MOVIE: addedMovie,
    });
  } catch (err) {
    console.error(err);

    res.status(500).send({
      message: "Unexpected Error",
    });
  }
});

app.listen(4000, () => {
  console.log("server started at port 4000");
});
