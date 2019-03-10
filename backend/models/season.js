const mongoose = require("mongoose");

const excerpt = require("../helpers/excerpt");
require("mongoose-type-url");

const User = require("./user");
const Show = require("./show");

const SeasonSchema = new mongoose.Schema(
  {
    seasonName: {
      type: String,
      trim: true,
      index: true,
      requred: true,
      minlength: 1,
      maxlength: 255
    },
    seasonNumber: {
      type: Number,
      trim: true,
      required: true,
      min: 1,
      max: 20
    },
    relatedShow: {
      ref: Show,
      type: mongoose.Schema.Types.ObjectId
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
  { collection: "seasons", timestamps: true }
);

SeasonSchema.pre("findOneAndUpdate", function(next) {
  const update = this.getUpdate();

  if (update.excerpt === undefined) {
    this.update({}, { excerpt: excerpt(update.seasonName) });
  }
  next();
});

SeasonSchema.pre("save", function(next) {
  if (!this.excerpt) {
    this.excerpt = excerpt(this.seasonName);
  }

  next();
});

module.exports = mongoose.model("Season", SeasonSchema);
