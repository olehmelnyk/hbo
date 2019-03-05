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
  const _id = req.params.seasonId;

  Season.findOne({ _id }, (error, season) => {
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
    trailerUri
  } = req.body;

  Season.create(req.body, (error, season) => {
    if (error) {
      console.error(error);
    }

    res.status(201).send(season);
  });
});

/* protected method - update show by id */
router.put("/:seasonId", (req, res, next) => {
  const _id = req.params.seasonId;
  const {
    seasonName,
    seasonNumber,
    relatedShow,
    description,
    image,
    trailerUri
  } = req.body;

  Season.findOneAndUpdate(
    { _id },
    {
      seasonName,
      seasonNumber,
      relatedShow,
      description,
      image,
      trailerUri
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
  const _id = req.params.seasonId;

  Season.findOneAndDelete({ _id }, (error, season) => {
    if (error) {
      console.error(error);
    }

    res.status(200).send(season);
  });
});

/* ================================
  Rating - not implemented, yet
==================================*/

/* - protected method that will add user votes (for rating) */
router.patch("/:seasonId/:uid/:vote", (req, res, next) => {
  // const _id = req.params.showId;
  // const vote = req.params.vote;
  // const uid = req.body.uid; // we can get this data from the jwt token

  // Season.findOne({ _id })
  //   .select("+votes")
  //   .exec()
  //   .then(show => {
  //     const votes = show.votes;
  //     votes.push({
  //       userId: uid,
  //       vote: vote
  //     });

  //     if (votes.length < 5) {
  //       res.status(200).json({ votes: "Not enouth votes..." });
  //     } else {
  //       const votesSum = votes.reduce((accum, curr) => accum + curr.vote, 0);
  //       const average = Math.round(votesSum / votes.length);

  //       // save in db

  //       res.status(200).json({ votes: average });
  //     }
  //   });

  res.status(501).send("Not implemented");
});

/* public method that will return show rating by showId */
router.get("/:seasonId/vote", (req, res, nect) => {
  const _id = req.params.seasonId;

  Season.findOne({ _id })
    .select("+votes")
    .exec()
    .then(season => {
      const votes = season.votes;
      const votesLength = votes.length;

      if (votesLength < 5) {
        res.status(200).json({ votes: "Not enouth votes..." });
      } else {
        const votesSum = votes.reduce((accum, curr) => accum + curr.vote, 0);
        const average = Math.round(votesSum / votesLength);
        res.status(200).json({ votes: average });
      }
    });
});

module.exports = router;
