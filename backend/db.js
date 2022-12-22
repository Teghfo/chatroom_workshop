const mongoose = require("mongoose");

async function dbConnection() {
  await mongoose.connect("mongodb://localhost:27017/chat");
  console.log("connected to db!");
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

module.exports = {
  dbConnection,
};
