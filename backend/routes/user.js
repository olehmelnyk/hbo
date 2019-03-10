const express = require("express");
const router = express.Router();

const User = require("../models/user");

/* get all users - returns array with users */
router.get("/", (req, res, next) => {
  User.find({}, (error, users) => {
    if (error) {
      console.log(error);
    }

    res.status(200).send(users);
  });
});

/* get user by id */
router.get("/:id", (req, res, next) => {
  const _id = req.params.id;

  User.findOne({ _id }, (error, user) => {
    if (error) {
      console.error(error);
    }

    res.status(200).send(user);
  });
});

/* create a new user */
router.post("/", (req, res, next) => {
  User.create(req.fields, (error, user) => {
    if (error) {
      console.error(error);
    }

    res.status(201).send(user);
  });
});

/* update user by id */
router.put("/:id", (req, res, next) => {
  const _id = req.params.id;

  User.findOneAndUpdate({ _id }, req.fields, { new: true }, (error, user) => {
    if (error) {
      console.error(error);
    }

    res.status(200).send(user);
  });
});

/* delete user by id */
router.delete("/:id", (req, res, next) => {
  const _id = req.params.id;

  User.findOneAndDelete({ _id }, (error, user) => {
    if (error) {
      console.error(error);
    }

    res.status(200).send(user);
  });
});

module.exports = router;
