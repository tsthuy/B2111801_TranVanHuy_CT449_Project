const express = require("express");
const Borrow = require("../model/borrow");
const Book = require("../model/book");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const sendToastError = require("../utils/sendToastError");
router.post("/create-borrow", async (req, res, next) => {
  try {
    const {
      borrowCode,
      readerCode,
      bookCode,
      borrowDate,
      deadlineDate,
      returnDate,
      totalPrice,
      num,
    } = req.body;
    const book = await Book.findOne({ bookCode });
    if (book.numberBook < num) {
      return sendToastError(res, "Không đủ số lượng sách!!!");
    }

    const borrowedBooks = await Borrow.find({ returnDate: { $exists: false } });
    if (borrowedBooks) {
      for (const borrowedBook of borrowedBooks) {
        if (borrowedBook.bookCode === bookCode) {
          return sendToastError(res, "Đã có người mượn sách này!");
        }
      }
    }
    const existingBorrow = await Borrow.findOne({ borrowCode });
    if (existingBorrow) {
      return res.status(400).json({
        success: false,
        message: "Borrow code already exists",
      });
    }

    const newBorrow = new Borrow({
      borrowCode,
      readerCode,
      bookCode,
      borrowDate,
      deadlineDate,
      returnDate,
      totalPrice,
      num,
    });

    const borrow = await newBorrow.save();
    book.numberBook -= num;
    await book.save();
    try {
      return res.status(201).json({
        success: true,
        borrow: borrow,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
router.get("/get-borrows", async (req, res, next) => {
  try {
    const borrows = await Borrow.find();
    const totalBorrows = borrows.length;
    return res.status(200).json({
      success: true,
      totalBorrows,
      borrows,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
router.put("/update-borrow", async (req, res, next) => {
  try {
    const { borrowCode, returnDate, status, phiPhat } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!borrowCode) {
      return sendToastError(res, "Borrow code is required");
    }

    // Tìm phiếu mượn trong cơ sở dữ liệu
    const borrow = await Borrow.findOne({ borrowCode });

    // Kiểm tra xem phiếu mượn có tồn tại hay không
    if (!borrow) {
      return sendToastError(res, "Borrow not found");
    }

    // Cập nhật thông tin phiếu mượn nếu có trong yêu cầu
    if (returnDate) {
      borrow.returnDate = returnDate;
    }
    if (status) {
      borrow.status = status;
    }
    if (phiPhat) {
      borrow.totalPrice += parseInt(phiPhat);
    }

    // Lưu thông tin phiếu mượn đã cập nhật
    await borrow.save();

    // Trả về phản hồi thành công
    return res
      .status(200)
      .json({ success: true, message: "Borrow updated successfully" });
  } catch (error) {
    // Xử lý lỗi nếu có
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
