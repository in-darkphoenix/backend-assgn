const express = require("express");

const { createBlog } = require("../controllers/blog-controller");
const { auth } = require("../middlewares/auth-middleware");

const blogRouter = express.Router();

blogRouter.post("/", auth, async (req, res) => {
  try {
    const addedBlog = await createBlog(req.body);

    res.status(201).send({
      data: addedBlog,
      message: "blog created successfully",
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).send({
      error: "Something went wrong",
    });
  }
});

module.exports = blogRouter;
