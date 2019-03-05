const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

require("mongoose-type-url");

const User = require("./user");
const Show = require("./show");

const excerpt = string =>
  string
    .trim()
    .replace(/\s+/g, "_")
    .replace(/\W+/g, "");

const SeasonSchema = new mongoose.Schema(
  {
    seasonName: {
      type: String,
      trim: true,
      index: true,
      requred: true,
      minlength: 1,
      maxlength: 255,
      unique: true
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
  { collection: "seasons" }
);

// require plugins
SeasonSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model("Season", SeasonSchema);
