const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/smart-donation");
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Failed", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
