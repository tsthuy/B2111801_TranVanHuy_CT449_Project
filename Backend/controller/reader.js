const express = require("express");
const Reader = require("../model/reader");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const sendToastError = require("../utils/sendToastError");

router.post("/create-reader", async (req, res, next) => {
  try {
    const { readerCode, fullName, birthday, gender, address, phone } = req.body;
    const readerFind = await Reader.findOne({ readerCode });

    if (readerFind) {
      return res.status(400).json({
        success: false,
        message: "Reader already exists",
      });
    }

    const readerData = {
      readerCode: readerCode,
      fullName: fullName,
      birthday: birthday,
      gender: gender,
      address: address,
      phone: phone,
    };
    const reader = await Reader.create(readerData);
    try {
      return res.status(201).json({
        success: true,
        reader,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

router.get("/get-readers", async (req, res, next) => {
  try {
    const readers = await Reader.find();
    const totalReaders = readers.length;
    return res.status(200).json({
      success: true,
      totalReaders,
      readers,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-reader", async (req, res, next) => {
  try {
    const { readerCode } = req.query;

    // Tìm độc giả trong cơ sở dữ liệu dựa trên mã độc giả
    const reader = await Reader.findOne({ readerCode });

    // Kiểm tra xem độc giả có tồn tại không
    if (!reader) {
      return sendToastError(res, "Reader not found");
    }

    // Nếu độc giả tồn tại, trả về thông tin của nó
    return res.status(200).json({
      success: true,
      reader,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.put("/update-reader/:readerCode", async (req, res, next) => {
  try {
    const { readerCode } = req.params;
    const reader = await Reader.findOne({ readerCode });
    if (!reader) {
      return sendToastError(res, "Reader not found");
    }
    // Update reader properties based on the request body
    reader.fullName = req.body.fullName || reader.fullName;
    reader.birthday = req.body.birthday || reader.birthday;
    reader.gender = req.body.gender || reader.gender;
    reader.address = req.body.address || reader.address;
    reader.phone = req.body.phone || reader.phone;

    // Save the updated reader to the database
    await reader.save();

    // Return a success response
    return res
      .status(200)
      .json({ success: true, message: "Reader updated successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.delete("/delete-reader/:readerCode", async (req, res, next) => {
  try {
    const { readerCode } = req.params;

    // Tìm và xóa độc giả dựa trên readerCode
    const deletedReader = await Reader.findOneAndDelete({ readerCode });

    // Kiểm tra xem độc giả có tồn tại không
    if (!deletedReader) {
      return sendToastError(res, "Reader not found");
    }

    // Trả về một thông báo thành công
    return res
      .status(200)
      .json({ success: true, message: "Reader deleted successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
router.get("/sort-readers", async (req, res, next) => {
  try {
    const { sortBy } = req.query;
    let sortField = {};

    // Xác định trường sắp xếp dựa trên giá trị của sortBy
    switch (sortBy) {
      case "fullName":
        sortField = { fullName: 1 }; // Sắp xếp theo trường fullName theo thứ tự tăng dần (A-Z)
        break;
      case "address":
        sortField = { address: 1 }; // Sắp xếp theo trường address theo thứ tự tăng dần (A-Z)
        break;
      case "readerCode":
        sortField = { readerCode: 1 }; // Sắp xếp theo trường readerCode theo thứ tự tăng dần (A-Z)
        break;
      default:
        sortField = { fullName: 1 }; // Mặc định sắp xếp theo trường fullName nếu không có lựa chọn hợp lệ
    }

    // Tìm và sắp xếp danh sách độc giả dựa trên trường được chỉ định
    const readers = await Reader.find().sort(sortField);

    // Trả về danh sách độc giả đã sắp xếp
    return res.status(200).json({ success: true, readers });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
module.exports = router;
