const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

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
      set: excerpt,
      unique: true
    }
  },
  { collection: "seasons" }
);

// require plugins
SeasonSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps

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
