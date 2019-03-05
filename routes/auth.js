const express = require("express");
const router = express.Router();

const config = require("../config");
const User = require("../models/user");

router.post("/login", (req, res, next) => {
  // receive email and password, send jwt token if everything is ok
  const { email, password } = req.body;

  res.status(501).send("Not implemented 😅");
});

router.post("/signup", (req, res, next) => {
  // create a new user, send jwt token
  const { email, username, password } = req.body;

  User.create({ email, username, password }, (error, user) => {
    if (error) {
      console.error(error);
    }

    // generate JWT token
    res.status(201).send(user);
  });
});

router.post("/forgot-password", (req, res, next) => {
  // send email with password-reset link
  res.status(501).send("Not implemented 😅");
});

router.post("/reset-password", (req, res, next) => {
  // send email with password-reset link
  res.status(501).send("Not implemented 😅");
});

module.exports = router;
