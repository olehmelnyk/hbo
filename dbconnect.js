const mongoose = require("mongoose");

const config = require("./config");

mongoose
  .connect(config.mongodb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(
    () => {
      console.log("MongoDB connected ✔ ");
    },
    err => {
      console.error("Connection to MongoDB failed", err);
    }
  );
