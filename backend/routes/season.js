const express = require("express");
const router = express.Router();

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
  const excerpt = req.params.seasonId;

  Season.findOne({ excerpt }, (error, season) => {
    if (error) {
      console.error(error);
    }

    res.status(200).send(season);
  });
});

/* protected method - create a new show */
router.post("/", (req, res, next) => {
  const {
    seasonName,
    seasonNumber,
    relatedShow,
    description,
    image,
    trailerUri,
    excerpt
  } = req.fields;

  Season.create(
    {
      seasonName,
      seasonNumber,
      relatedShow,
      description,
      image,
      trailerUri,
      excerpt
    },
    (error, season) => {
      if (error) {
        console.error(error);
      }

      res.status(201).send(season);
    }
  );
});

/* protected method - update show by id */
router.put("/:seasonId", (req, res, next) => {
  const id = req.params.seasonId;
  const {
    seasonName,
    seasonNumber,
    relatedShow,
    description,
    image,
    trailerUri,
    excerpt
  } = req.fields;

  Season.findOneAndUpdate(
    { excerpt: id },
    {
      seasonName,
      seasonNumber,
      relatedShow,
      description,
      image,
      trailerUri,
      excerpt
    },
    { new: true },
    (error, season) => {
      if (error) {
        console.error(error);
      }

      res.status(200).send(season);
    }
  );
});

/* protected method - delete show by id */
router.delete("/:seasonId", (req, res, next) => {
  const excerpt = req.params.seasonId;

  Season.findOneAndDelete({ excerpt }, (error, season) => {
    if (error) {
      console.error(error);
    }

    res.status(200).send(season);
  });
});

module.exports = router;
