const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const config = require("../config");
const User = require("../models/user");

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.fields);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.fields;

  User.findOne({ email })
    .select("+password")
    .then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            jwt.sign(
              {
                id: user._id,
                name: user.name,
                avatar: user.avatar
              },
              config.jwt.secret,
              {
                expiresIn: 3600
              },
              (err, token) => {
                if (err) console.error("There is some error in token", err);
                else {
                  res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`
                  });
                }
              }
            );
          } else {
            errors.password = "Incorrect Password";
            return res.status(400).json(errors);
          }
        })
        .catch(error => console.log(error));
    });
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
);

router.post("/register", (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.fields);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.fields.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const avatar = gravatar.url(req.fields.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name: req.fields.name,
        email: req.fields.email,
        password: req.fields.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              newUser.password = hash;
              newUser.save().then(user => {
                res.status(201).json(user);
              });
            }
          });
        }
      });
    }
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
