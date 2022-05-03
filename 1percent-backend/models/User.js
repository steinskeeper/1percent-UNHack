const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model("User", userschema);
