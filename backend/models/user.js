const mongoose = require("mongoose");
const bcrypt = require("mongoose-bcrypt");
const timestamps = require("mongoose-timestamp");

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
    username: {
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
    admin: {
      type: Boolean,
      default: false
    }
  },
  { collection: "users" }
);

// require plugins
UserSchema.plugin(bcrypt); // automatically bcrypts passwords
UserSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model("User", UserSchema);
