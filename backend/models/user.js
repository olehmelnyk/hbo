const mongoose = require("mongoose");
const bcrypt = require("mongoose-bcrypt");

const sanitizeUsername = username =>
  username
    .trim()
    .replace(/\s+/g, "_")
    .replace(/\W+/g, "");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      required: true
    },
    name: {
      type: String,
      index: true,
      unique: true,
      required: true,
      set: sanitizeUsername
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    avatar: {
      type: String,
      trim: true
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
  { collection: "users", timestamps: true }
);

// require plugins
// UserSchema.plugin(bcrypt); // automatically bcrypts passwords
// UserSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model("User", UserSchema);
