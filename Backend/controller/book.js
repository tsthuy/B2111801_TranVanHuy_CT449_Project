const express = require("express");
const Book = require("../model/book");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const sendToastError = require("../utils/sendToastError");
router.post("/create-book", async (req, res, next) => {
  try {
    const { bookCode, bookName, price, numberBook, yearPB, NXBCode, writer } =
      req.body;
    const bookFind = await Book.findOne({ bookCode });

    if (bookFind) {
      return res.status(400).json({
        success: false,
        message: "book already exists",
      });
    }

    const bookData = {
      bookCode: bookCode,
      bookName: bookName,
      price: price,
      numberBook: numberBook,
      yearPB: yearPB,
      NXBCode: NXBCode,
      writer: writer,
    };
    const book = await Book.create(bookData);
    try {
      return res.status(201).json({
        success: true,
        book,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
router.get("/get-books", async (req, res, next) => {
  try {
    const books = await Book.find();
    const totalBooks = books.length;
    return res.status(200).json({
      success: true,
      totalBooks,
      books,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
router.get("/search-books", async (req, res, next) => {
  try {
    let query = {}; // Mặc định là truy vấn rỗng

    // Kiểm tra xem có tham số tìm kiếm không
    if (req.query.search) {
      // Tạo một biểu thức chính quy để tìm kiếm tên sách chứa từ khóa
      const searchRegex = new RegExp(req.query.search, "i");
      // Tìm sách có tên chứa từ khóa
      query = { bookName: searchRegex };
    }

    // Thực hiện truy vấn
    const books = await Book.find(query);
    const totalBooks = books.length;

    return res.status(200).json({
      success: true,
      totalBooks,
      books,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
