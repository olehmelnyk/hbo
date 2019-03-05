const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const cors = require("cors");
const passport = require("passport");
const formidable = require("express-formidable");

const config = require("./config");

const app = express();

// initialize middleware
app.use(logger("dev"));
app.use(formidable()); // parsing form data, including application/x-www-form-urlencoded, application/json, and multipart/form-data
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/show", require("./routes/show"));
app.use("/api/v1/season", require("./routes/season"));
app.use("/api/v1/episode", require("./routes/episode"));

module.exports = app;
