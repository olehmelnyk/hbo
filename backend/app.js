const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const formidable = require("express-formidable");

const config = require("./config");

const app = express();

// initialize middleware
app.use(cors());
app.use(logger("dev"));
app.use(formidable()); // parsing form data, including application/x-www-form-urlencoded, application/json, and multipart/form-data

app.use(cookieParser());

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/show", require("./routes/show"));
app.use("/api/v1/season", require("./routes/season"));
app.use("/api/v1/episode", require("./routes/episode"));

// require("./seed");

module.exports = app;
