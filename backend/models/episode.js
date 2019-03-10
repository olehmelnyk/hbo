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
      maxlength: 255
    },
    episodeNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 35
    },
    relatedShow: {
      ref: Show,
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    relatedSeason: {
      ref: Season,
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    description: {
      type: String,
      trim: true,
      minlength: 0,
      maxlength: 5000
    },
    image: {
      poster: {
        type: mongoose.SchemaTypes.Url
      },
      backdrop: {
        type: mongoose.SchemaTypes.Url
      },
      still: {
        type: mongoose.SchemaTypes.Url
      }
    },
    trailerUri: {
      type: mongoose.SchemaTypes.Url
    },
    airDate: {
      type: Date
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
