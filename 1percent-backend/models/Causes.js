const mongoose = require("mongoose");

const causeschema = mongoose.Schema(
  {
    causeTitle: String,
    causeDescription: String,
    causeImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Causes", causeschema);

