const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Season = require("../models/season");

/* public - get all seasons - returns array with seasons */
router.get("/", (req, res, next) => {
  Season.find({}, (error, seasons) => {
    if (error) {
      console.log(error);
    }

    res.status(200).send(seasons);
  });
});

/* public - get show by id */
router.get("/:seasonId", (req, res, next) => {
  const _id = req.params.seasonId;
  const ObjectId = mongoose.Types.ObjectId;

  Season.aggregate([
    { $match: { _id: ObjectId(_id) } },
    {
      $lookup: {
        from: "shows",
        localField: "relatedShow",
        foreignField: "_id",
        as: "show"
      }
    },
    {
      $lookup: {
        from: "episodes",
        localField: "_id",
        foreignField: "relatedSeason",
        as: "episodes"
      }
    }
  ])
    .exec()
    .then(season => {
      res.status(200).json(season[0]);
    })
    .catch(error => res.status(500).end());
});

/* protected method - create a new show */
router.post("/", (req, res, next) => {
  Season.create({ ...req.fields }, (error, season) => {
    if (error) {
      console.error(error);
    }

    res.status(201).send(season);
  });
});

/* protected method - update show by id */
router.put("/:seasonId", (req, res, next) => {
  const _id = req.params.seasonId;

  Season.findOneAndUpdate(
    { _id },
    { ...req.fields },
    { new: true },
    (error, season) => {
      if (error) {
        throw new Error(error);
      }

      res.status(200).send(season);
    }
  ).catch(error => {
    console.log(error);
    res.status(500).send(error.message);
  });
});

/* protected method - delete show by id */
router.delete("/:seasonId", (req, res, next) => {
  const _id = req.params.seasonId;

  Season.findOneAndDelete({ _id }, (error, season) => {
    if (error) {
      console.error(error);
    }

    res.status(200).send(season);
  });
});

module.exports = router;
