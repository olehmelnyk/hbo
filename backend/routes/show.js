const express = require("express");
const router = express.Router();
const passport = require("passport");

const Show = require("../models/show");

/* public - get all shows - returns array with shows */
router.get("/", (req, res, next) => {
  Show.find({}, (error, shows) => {
    if (error) {
      res.status(404).json(error.message);
      throw new Error(error.message);
    }

    res.status(200).send(shows);
  }).catch(error => console.log(error));
});

router.get("/featured", (req, res, next) => {
  Show.find({ priority: true }, (error, shows) => {
    if (error) {
      res.status(404).json(error.message);
      throw new Error(error.message);
    }
    res.status(200).json(shows);
  }).catch(error => console.log(error));
});

/* public - get show by id */
router.get("/:excerpt", (req, res, next) => {
  const excerpt = req.params.excerpt;

  Show.aggregate([
    { $match: { excerpt } },
    {
      $lookup: {
        from: "seasons",
        localField: "_id",
        foreignField: "relatedShow",
        as: "seasons"
      }
    },
    {
      $lookup: {
        from: "episodes",
        localField: "_id",
        foreignField: "relatedShow",
        as: "episodes"
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
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Show.create(req.body, (error, show) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      }

      res.status(201).send(show);
    });
  }
);

/* protected method - update show by id */
router.put(
  "/:excerpt",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const excerpt = req.params.excerpt;

    Show.findOneAndUpdate(
      { excerpt },
      req.fields,
      { new: true },
      (error, show) => {
        if (error) {
          console.log(error);
          res.status(400).json(error.message);
        }

        res.status(200).send(show);
      }
    );
  }
);

/* protected method - delete show by id */
router.delete(
  "/:excerpt",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const excerpt = req.params.excerpt;

    Show.findOneAndDelete({ excerpt }, (error, show) => {
      if (error) {
        res.status(400).json(error.message);
        throw new Error(error.message);
      }

      res.status(200).send(show);
    }).catch(error => console.log(error));
  }
);

module.exports = router;
