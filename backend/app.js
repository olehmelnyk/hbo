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
app.use(passport.initialize());
require("./passport")(passport);

app.use(cors());
app.use(logger("dev"));
// app.use(formidable());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/v1/show", require("./routes/show"));
app.use("/api/v1/season", require("./routes/season"));
app.use("/api/v1/episode", require("./routes/episode"));
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/user", require("./routes/user"));

module.exports = app;
