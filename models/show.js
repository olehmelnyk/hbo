const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
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
    startDate: {
      type: Date,
      default: Date.now()
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
    priority: {
      type: Boolean,
      default: false
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
  { collection: "shows" }
);

// require plugins
ShowSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps

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
