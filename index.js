const express = require("express");
const app = express();
const port = 5000;

// Middleware Array
const middleware = [
  express.static("public"),
  express.urlencoded({ extended: true, limit: "100mb" }),
  express.json({ limit: "100mb" }),
];

app.use(middleware);

app.listen(port, () => {
  console.log("task 1 server is running");
});
