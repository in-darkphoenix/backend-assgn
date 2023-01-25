const express = require("express");
const {
  register,
  login,
  getLoggedInUser,
} = require("../controllers/auth-controller");
const { auth } = require("../middlewares/auth-middleware");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/loggedInUser", auth, getLoggedInUser);

module.exports = authRouter;
