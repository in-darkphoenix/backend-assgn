const jwt = require("jsonwebtoken");

const { config } = require("../config/config");
const User = require("../models/User");

const generateToken = (user) => {
  const { _id, name, email } = user;

  const jsonWebToken = jwt.sign({ _id, name, email }, config.JWT_SECRET_KEY);

  return jsonWebToken;
};

const register = async (req, res) => {
  try {
    const userObj = req.body;
    const { email } = userObj;

    let user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).send({
        error: "User with email already exists",
      });
    }

    user = await User.create(userObj);

    res.send({
      data: user,
      message: "Registration successful",
    });
  } catch (err) {
    console.error(err);

    res.status(500).send({
      error: "Something went wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(400).send({
        error: "User with email does not exist",
      });
    } else if (user.password !== password) {
      res.status(400).send({
        error: "Wrong password",
      });
    } else {
      // Create JWT token
      const token = generateToken(user);
      const { _id, name, social_profile } = user;

      res.send({
        message: "Login successful",
        data: {
          token,
          user: {
            _id,
            name,
            email,
            social_profile,
          },
        },
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: "Something went wrong",
    });
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const user = req.user;
    res.send({
      data: user,
    });
  } catch (err) {
    res.status(500).send({
      error: "Something went wrong",
    });
  }
};

module.exports = { register, login, getLoggedInUser };
