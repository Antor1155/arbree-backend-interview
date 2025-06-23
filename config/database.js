const mongoose = require("mongoose");

function databaseConnection() {
  const { DB_URI } = process.env;

  mongoose.set("strictQuery", true);
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Database connected..");
    })
    .catch((e) => {
      return console.log(e);
    });
}

module.exports = databaseConnection;
