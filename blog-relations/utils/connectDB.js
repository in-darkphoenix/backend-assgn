const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const { config } = require("../config/config");

const connectDB = async () => {
  const result = await mongoose.connect(config.DB_CONNECTION_URL);

  return result;
};

module.exports = connectDB;
