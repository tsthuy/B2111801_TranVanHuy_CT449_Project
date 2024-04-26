const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  bookCode: {
    type: String,
    require: [true, "Please enter your book code!"],
  },
  bookName: {
    type: String,
    require: [true, "Please enter your book name"],
  },
  price: {
    type: Number,
    require: [true, "Please enter Price of book"],
  },
  numberBook: {
    type: String,
    require: [true, "Please enter your number of book"],
  },
  yearPB: {
    type: String,
    require: [true, "Please enter your year's public"],
  },
  NXBCode: {
    type: String,
    require: [true, "Please enter your NXB Code"],
  },
  writer: {
    type: String,
    require: [true, "Please enter your writer"],
  },
  type: {
    type: String,
    require: [true, "Please enter your type"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Book", bookSchema);
