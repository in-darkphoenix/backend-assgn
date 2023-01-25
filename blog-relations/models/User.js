const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  social_profile: {
    linkedIn: String,
    facebook: String,
    twiter: String,
    github: String,
    instagram: String,
  },
  addresses: [{ line1: String, city: String, state: String, pincode: String }],
  blog_ids: [String],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
