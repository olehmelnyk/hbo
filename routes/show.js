const express = require("express");
const router = express.Router();

const Show = require("../models/show");

/* public - get all shows - returns array with shows */
router.get("/", (req, res, next) => {
  Show.find({}, (error, shows) => {
    if (error) {
      console.log(error);
    }

    res.status(200).send(shows);
  });
});

/* public - get show by id */
router.get("/:showId", (req, res, next) => {
  const _id = req.params.showId;

  Show.findOne({ _id }, (error, show) => {
    if (error) {
      console.error(error);
    }

    res.status(200).send(show);
  });
});

/* protected method - create a new show */
router.post("/", (req, res, next) => {
  const {
    title,
    subtitle,
    startDate,
    image,
    description,
    priority,
    trailerUri
  } = req.body;

  console.log(req);

  Show.create(req.body, (error, show) => {
    if (error) {
      console.error(error);
    }

    res.status(201).send(show);
  });
});

/* protected method - update show by id */
router.put("/:showId", (req, res, next) => {
  const _id = req.params.showId;
  const {
    title,
    subtitle,
    startDate,
    image,
    description,
    priority,
    trailerUri
  } = req.body;

  Show.findOneAndUpdate(
    { _id },
    {
      title,
      subtitle,
      startDate,
      image,
      description,
      priority,
      trailerUri
    },
    { new: true },
    (error, show) => {
      if (error) {
        console.error(error);
      }

      res.status(200).send(show);
    }
  );
});

/* protected method - delete show by id */
router.delete("/:showId", (req, res, next) => {
  const _id = req.params.showId;

  Show.findOneAndDelete({ _id }, (error, show) => {
    if (error) {
      console.error(error);
    }

    res.status(200).send(show);
  });
});

/* ================================
  Rating - not implemented, yet
  Rating - not implemented, yet
==================================*/

/* - protected method that will add user votes (for rating) */
router.patch("/:showId/:uid/:vote", (req, res, nect) => {
  // const _id = req.params.showId;
  // const vote = req.params.vote;
  // const uid = req.body.uid; // we can get this data from the jwt token

  // Show.findOne({ _id })
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
router.get("/:showId/vote", (req, res, nect) => {
  const _id = req.params.showId;

  Show.findOne({ _id })
    .select("+votes")
    .exec()
    .then(show => {
      const votes = show.votes;
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
