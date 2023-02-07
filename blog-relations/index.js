require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const blogRouter = require("./routes/blog-router");
const authRouter = require("./routes/auth-router");

const connectDB = require("./utils/connectDB");
const { config } = require("./config/config");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);

app.use("/", express.static("static"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./static/index.html"));
});

connectDB()
  .then(() => {
    console.log("Connected to database...");

    const port = config.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}/`);
    });

    // generateFakeCategory();
    // generateFakeBlog();
    // generateFakeUser();
    // generateFakeComment();
    // generateFakeLike();
  })
  .catch((err) => {
    console.error(err.message);
  });
