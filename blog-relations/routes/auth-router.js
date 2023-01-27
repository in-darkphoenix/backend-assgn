const express = require("express");
const {
  register,
  login,
  getLoggedInUser,
  signInWithGithub,
} = require("../controllers/auth-controller");
const { auth } = require("../middlewares/auth-middleware");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/github-signin/:code", signInWithGithub);
authRouter.get("/loggedInUser", auth, getLoggedInUser);

module.exports = authRouter;
