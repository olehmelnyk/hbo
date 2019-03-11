const express = require("express");
const router = express.Router();

const User = require("../models/user");

/* get all users - returns array with users */
router.get("/", (req, res, next) => {
  User.find({}, (error, users) => {
    if (error) {
      res.status(500).json(error);
    }

    res.status(200).json(users);
  });
});

/* get user by id */
router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  User.findById(id, (error, user) => {
    if (error) {
      res.status(500).end(error);
    } else if (!user || !user._id) {
      res.status(404).end("User not found");
    } else {
      res.status(200).json(user);
    }
  });
});

/* create a new user */
router.post("/", (req, res, next) => {
  User.create(req.fields, (error, user) => {
    if (error) {
      res.status(500).json(error);
    }

    res.status(201).json(user);
  });
});

/* update user by id */
router.put("/:id", (req, res, next) => {
  const _id = req.params.id;

  User.findOneAndUpdate({ _id }, req.fields, { new: true }, (error, user) => {
    if (error) {
      res.status(500).json(error);
    }

    res.status(200).json(user);
  });
});

/* delete user by id */
router.delete("/:id", (req, res, next) => {
  const _id = req.params.id;

  User.findOneAndDelete({ _id }, (error, user) => {
    if (error) {
      res.status(500).json(error);
    }

    res.status(200).json(user);
  });
});

module.exports = router;
