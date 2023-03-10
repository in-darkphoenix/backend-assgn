const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcryptjs");

const { config } = require("../config/config");
const User = require("../models/User");

const generateToken = (user) => {
  const { _id, name, image, email } = user;

  const jsonWebToken = jwt.sign(
    { _id, name, email, image },
    config.JWT_SECRET_KEY
  );

  return jsonWebToken;
};

const register = async (req, res) => {
  try {
    const userObj = req.body;
    const { email } = userObj;
    userObj.signinMethod = "email-password";

    let user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).send({
        error: "User with email already exists",
      });
    }

    let password = userObj.password;
    password = bcrypt.hashSync(password);
    userObj.password = password;

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
    } else if (!bcrypt.compareSync(password, user.password)) {
      res.status(400).send({
        error: "Wrong password",
      });
    } else {
      // Create JWT token
      const token = generateToken(user);
      const { _id, name } = user;

      res.send({
        message: "Login successful",
        data: {
          token,
          user: {
            _id,
            name,
            email,
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

const signInWithGithub = async (req, res) => {
  try {
    const code = req.params.code;

    // exchange the code with access token
    const url = `https://github.com/login/oauth/access_token`;

    let response = await axios.post(url, null, {
      params: {
        client_id: config.GITHUB_OAUTH_CLIENT_ID,
        client_secret: config.GITHUB_OAUTH_CLIENT_SECRET,
        code: code,
      },
      headers: {
        Accept: "application/json",
      },
    });

    let accessToken = response.data.access_token;
    //console.log(response.data); // due to react strict mode it called twice with same code
    if (!accessToken) {
      throw new Error("cat Something went wrong");
    }

    let url2 = "https://api.github.com/user";

    response = await axios.get(url2, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    let user = response.data;

    let existingUser = await User.findOne({
      signinMethod: "github-oauth",
      social_profile: { github: user.login },
    });

    if (!existingUser) {
      existingUser = await User.create({
        name: user.name,
        email: user.email,
        image: user.avatar_url,
        signinMethod: "github-oauth",
        social_profile: { github: user.login },
      });
    }

    // Create JWT token
    const token = generateToken(existingUser);
    const { _id, name, image, email } = existingUser;

    return res.send({
      message: "Login with github successful",
      data: {
        token,
        user: {
          _id,
          name,
          email,
          image,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
};

const signInWithGoogle = async (req, res) => {
  try {
    const code = req.params.code;

    // exchange the code with access token
    const url = `https://oauth2.googleapis.com/token`;

    let response = await axios.post(url, null, {
      params: {
        code,

        client_id: config.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: config.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: "http://localhost:3000/google-signin",
        grant_type: "authorization_code",
      },
      headers: {
        Accept: "application/json",
      },
    });

    let accessToken = response.data.access_token;
    let idToken = response.data.id_token;
    //console.log("cat:->", response.data); // due to react strict mode it called twice with same code
    if (!accessToken) {
      throw new Error("access token not found error");
    }
    if (!idToken) {
      throw new Error("id token not found error");
    }

    let url2 = "https://www.googleapis.com/oauth2/v1/userinfo";

    response = await axios.get(
      url2,
      {
        params: {
          alt: "json",
          access_token: accessToken,
        },
      },
      {
        headers: {
          authorization: `Bearer ${idToken}`,
        },
      }
    );

    // console.log(response.data);
    let user = response.data;

    let existingUser = await User.findOne({
      signinMethod: "google-oauth",
      email: user.email,
    });

    if (!existingUser) {
      existingUser = await User.create({
        name: user.name,
        email: user.email,
        image: user.picture,
        signinMethod: "google-oauth",
      });
    }

    // Create JWT token
    const token = generateToken(existingUser);
    const { _id, name, image, email } = existingUser;

    res.send({
      message: "Login with Google successful",
      data: {
        token,
        user: {
          _id,
          name,
          email,
          image,
        },
      },
    });
  } catch (err) {
    console.error(err.message);
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

module.exports = {
  register,
  login,
  signInWithGithub,
  signInWithGoogle,
  getLoggedInUser,
};
