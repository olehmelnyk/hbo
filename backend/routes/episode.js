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

  // Episode.findOne({ excerpt: id }, (error, episode) => {
  //   if (error) {
  //     console.error(error);
  //   }

  //   res.status(200).send(episode);
  // });
  Episode.aggregate([
    { $match: { excerpt: id } },
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
        from: "seasons",
        localField: "relatedSeason",
        foreignField: "_id",
        as: "season"
      }
    }
  ])
    .exec()
    .then(show => {
      res.status(200).json(show[0]);
    })
    .catch(error => res.status(500).end());
});

/* protected method - create a new show */
router.post("/", (req, res, next) => {
  Episode.create(req.fields, (error, v) => {
    if (error) {
      console.error(error);
    }

    res.status(201).send(v);
  });
});

/* protected method - update show by id */
router.put("/:episodeId", (req, res, next) => {
  const id = req.params.episodeId;

  Episode.findOneAndUpdate(
    { excerpt: id },
    req.fields,
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
