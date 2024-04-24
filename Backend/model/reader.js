const mongoose = require("mongoose");
const readerSchema = new mongoose.Schema({
  readerCode: {
    type: String,
    require: [true, "Please enter your reader code!"],
  },
  fullName: {
    type: String,
    require: [true, "Please enter your full name"],
  },
  birthday: {
    type: String,
    require: [true, "Please enter your birthday"],
  },
  gender: {
    type: String,
    require: [true, "Please enter your gender"],
  },
  address: {
    type: String,
    require: [true, "Please enter your address"],
  },
  phone: {
    type: String,
    require: [true, "Please enter your phone"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Reader", readerSchema);
