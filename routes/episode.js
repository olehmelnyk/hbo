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
  const _id = req.params.episodeId;

  Episode.findOne({ _id }, (error, episode) => {
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
    trailerUri
  } = req.body;

  Episode.create(req.body, (error, v) => {
    if (error) {
      console.error(error);
    }

    res.status(201).send(v);
  });
});

/* protected method - update show by id */
router.put("/:episodeId", (req, res, next) => {
  const _id = req.params.episodeId;
  const {
    episodeName,
    episodeNumber,
    relatedShow,
    relatedSeason,
    description,
    image,
    trailerUri
  } = req.body;

  Episode.findOneAndUpdate(
    { _id },
    {
      episodeName,
      episodeNumber,
      relatedShow,
      relatedSeason,
      description,
      image,
      trailerUri
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
  const _id = req.params.episodeId;

  Episode.findOneAndDelete({ _id }, (error, episode) => {
    if (error) {
      console.error(error);
    }

    res.status(200).send(episode);
  });
});

/* ================================
  Rating - not implemented, yet
==================================*/

/* - protected method that will add user votes (for rating) */
router.patch("/:episodeId/:uid/:vote", (req, res, next) => {
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
router.get("/:episodeId/vote", (req, res, nect) => {
  const _id = req.params.episodeId;

  Episode.findOne({ _id })
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
