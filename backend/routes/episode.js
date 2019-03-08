const express = require("express");
const router = express.Router();

const Episode = require("../models/episode");

/* public - get all seasons - returns array with seasons */
router.get("/", (req, res, next) => {
  Episode.find({}, (error, episodes) => {
    if (error) {
      console.log(error);
    }

    res.status(200).send(episodes);
  });
});

/* public - get show by id */
router.get("/:episodeId", (req, res, next) => {
  const id = req.params.episodeId;

  Episode.findOne({ excerpt: id }, (error, episode) => {
    if (error) {
      console.error(error);
    }

    res.status(200).send(episode);
  });
});

/* protected method - create a new show */
router.post("/", (req, res, next) => {
  const {
    episodeName,
    episodeNumber,
    relatedShow,
    relatedSeason,
    description,
    image,
    trailerUri,
    excerpt
  } = req.fields;

  Episode.create(
    {
      episodeName,
      episodeNumber,
      relatedShow,
      relatedSeason,
      description,
      image,
      trailerUri,
      excerpt
    },
    (error, v) => {
      if (error) {
        console.error(error);
      }

      res.status(201).send(v);
    }
  );
});

/* protected method - update show by id */
router.put("/:episodeId", (req, res, next) => {
  const id = req.params.episodeId;
  const {
    episodeName,
    episodeNumber,
    relatedShow,
    relatedSeason,
    description,
    image,
    trailerUri,
    excerpt
  } = req.fields;

  Episode.findOneAndUpdate(
    { excerpt: id },
    {
      episodeName,
      episodeNumber,
      relatedShow,
      relatedSeason,
      description,
      image,
      trailerUri,
      excerpt
    },
    { new: true },
    (error, episode) => {
      if (error) {
        console.error(error);
      }

      res.status(200).send(episode);
    }
  );
});

/* protected method - delete show by id */
router.delete("/:episodeId", (req, res, next) => {
  const excerpt = req.params.episodeId;

  Episode.findOneAndDelete({ excerpt }, (error, episode) => {
    if (error) {
      console.error(error);
    }

    res.status(200).send(episode);
  });
});

module.exports = router;
