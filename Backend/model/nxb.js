const mongoose = require("mongoose");
const nxbSchema = new mongoose.Schema({
  nxbCode: {
    type: String,
    require: [true, "Please enter your nxb code!"],
  },
  nxbName: {
    type: String,
    require: [true, "Please enter your nxb name"],
  },
  address: {
    type: Number,
    require: [true, "Please enter your address"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("NXB", nxbSchema);
