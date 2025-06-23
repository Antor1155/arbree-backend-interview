require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const indexRouter = require("./routes/index");
const databaseConnection = require("./config/database");
const { PORT } = process.env;

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database
databaseConnection();

// Middleware Array
const middleware = [
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
  express.static("public"),
  express.urlencoded({ extended: true, limit: "100mb" }),
  express.json({ limit: "100mb" }),
];

app.use(middleware);
app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`task 1 server is running on PORT :  ${PORT} `);
});
