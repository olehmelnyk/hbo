const mongoose = require("mongoose");

const excerpt = require("../helpers/excerpt");

require("mongoose-type-url");

const User = require("./user");
const Show = require("./show");
const Season = require("./season");

const EpisodeSchema = new mongoose.Schema(
  {
    episodeName: {
      type: String,
      trim: true,
      index: true,
      requred: true,
      minlength: 1,
      maxlength: 255,
      unique: true
    },
    episodeNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 35
    },
    relatedShow: {
      ref: Show,
      type: mongoose.Schema.Types.ObjectId
    },
    relatedSeason: {
      ref: Season,
      type: mongoose.Schema.Types.ObjectId
    },
    description: {
      short: {
        type: String,
        minlength: 1,
        maxlength: 255
      },
      long: {
        type: String,
        minlength: 1,
        maxlength: 1000
      }
    },
    image: {
      square: {
        type: mongoose.SchemaTypes.Url
      },
      wide: {
        type: mongoose.SchemaTypes.Url
      },
      extraWide: {
        type: mongoose.SchemaTypes.Url
      }
    },
    trailerUri: {
      type: mongoose.SchemaTypes.Url
    },
    votes: {
      type: [
        {
          userId: {
            ref: User,
            type: mongoose.Schema.Types.ObjectId
          },
          vote: {
            type: Number,
            min: 1,
            max: 5
          }
        }
      ],
      select: false
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    excerpt: {
      type: String,
      trim: true,
      index: true,
      set: excerpt
    }
  },
  { collection: "episodes", timestamps: true }
);

EpisodeSchema.pre("findOneAndUpdate", function(next) {
  const update = this.getUpdate();

  if (update.excerpt === undefined) {
    this.update({}, { excerpt: excerpt(update.episodeName) });
  }
  next();
});

EpisodeSchema.pre("save", function(next) {
  if (!this.excerpt) {
    this.excerpt = excerpt(this.episodeName);
  }

  next();
});

module.exports = mongoose.model("Episode", EpisodeSchema);
