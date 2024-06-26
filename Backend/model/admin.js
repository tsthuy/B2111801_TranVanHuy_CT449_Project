const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminSchema = new mongoose.Schema({
  msnv: {
    type: String,
    require: [true, "Please enter your admin code!"],
  },
  fullName: {
    type: String,
    require: [true, "Please enter your full name"],
  },
  password: {
    type: String,
    require: [true, "Please enter your password"],
  },
  position: {
    type: String,
    require: [true, "Please enter your position"],
  },
  address: {
    type: String,
    require: [true, "Please enter your address"],
  },
  position: {
    type: String,
    require: [true, "Please enter your position"],
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
// compare password
adminSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("Admin", adminSchema);
