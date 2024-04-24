const express = require("express");
const Admin = require("../model/admin");
const admin = require("../model/admin");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const sendToastError = require("../utils/sendToastError");
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

// login admin
router.post("/login-admin", async (req, res, next) => {
  try {
    const { msnv, password } = req.body;

    if (!msnv || !password) {
      return sendToastError(res, "Please provide all fields!");
    }
    const enteredPassword = password;
    const admin = await Admin.findOne({ msnv }).select("+password");

    if (!admin) {
      return sendToastError(res, "admin doesn't exist!");
    }
    if (password === enteredPassword) {
      return res.status(200).json({
        success: true,
        admin,
      });
    } else {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
module.exports = router;
