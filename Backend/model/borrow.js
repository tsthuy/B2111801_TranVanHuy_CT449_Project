const mongoose = require("mongoose");
const borrowSchema = new mongoose.Schema({
  borrowCode: {
    type: String,
    require: [true, "Please enter your borrow code!"],
  },
  readerCode: {
    type: String,
    require: [true, "Please enter your reader code!"],
  },
  bookCode: {
    type: String,
    require: [true, "Please enter your book code!"],
  },
  borrowDate: {
    type: Date,
    require: [true, "Please enter your borrow day!"],
  },
  returnDate: {
    type: Date,
    require: [true, "Please enter your return day!"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Borrow", borrowSchema);
