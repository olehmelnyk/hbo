const mongoose = require("mongoose");

const excerpt = require("../helpers/excerpt");

const User = require("./user");

require("mongoose-type-url");

const ShowSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      requred: true,
      minlength: 1,
      maxlength: 255
    },
    subtitle: {
      type: String,
      trim: true,
      required: true
    },
    firstAirDate: {
      type: Date,
      default: Date.now()
    },
    lastAirDate: {
      type: Date
    },
    episodeRunTime: {
      type: Number
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
    video: {
      type: mongoose.SchemaTypes.Url
    },
    numberOfSeasons: {
      type: Number,
      default: 1,
      min: 1,
      max: 35
    },
    numberOfEpisodes: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
      default: "Returning Series",
      trim: true
    },
    inProduction: {
      type: Boolean,
      default: true
    },
    genres: {
      type: Array
    },
    priority: {
      type: Boolean,
      default: false
    },
    excerpt: {
      type: String,
      trim: true,
      index: true,
      set: excerpt
    }
  },
  { collection: "shows", timestamps: true }
);

ShowSchema.pre("findOneAndUpdate", function(next) {
  const update = this.getUpdate();

  if (update.excerpt === undefined) {
    this.update({}, { excerpt: excerpt(update.title) });
  }
  next();
});

ShowSchema.pre("save", function(next) {
  if (!this.excerpt) {
    this.excerpt = excerpt(this.title);
  }

  next();
});

module.exports = mongoose.model("Show", ShowSchema);
