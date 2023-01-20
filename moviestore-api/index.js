const express = require("express");

const connectDB = require("./controller/connectDB");
const movieRouter = require("./router/movie");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("<h1>Catsloveme</h1>");
});

app.use("/", movieRouter);

connectDB()
  .then(() => {
    app.listen(4000, () => {
      console.log(
        "Database connection successfull, Server running at port 4000"
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });
