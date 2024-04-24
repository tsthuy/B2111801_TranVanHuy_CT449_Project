const express = require("express");
const Admin = require("../model/admin");
const admin = require("../model/admin");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
router.post("/create-admin", async (req, res, next) => {
  try {
    const { msnv, position, name, password, address, phone } = req.body;
    const adminCode = await Admin.findOne({ msnv });

    if (adminCode) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const adminData = {
      msnv: msnv,
      name: name,
      position: position,
      password: password,
      address: address,
      phone: phone,
    };
    const admin = await Admin.create(adminData);
    try {
      return res.status(201).json({
        success: true,
        admin,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
module.exports = router;
