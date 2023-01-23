const mongoose = require("mongoose");

const connectDB = async () => {
  const result = await mongoose.connect(
    "mongodb://127.0.0.1:27017/blog_relations"
  );

  return result;
};

module.exports = connectDB;
