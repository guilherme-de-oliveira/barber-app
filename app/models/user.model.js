const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    phoneNumber: String,
    password: String,
    role: String,
    img: [{
      data: Buffer,
      contentType: String
    }]
  })
);

module.exports = User;