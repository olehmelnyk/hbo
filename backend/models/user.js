const mongoose = require("mongoose");

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
      required: true
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

module.exports = mongoose.model("User", UserSchema);
