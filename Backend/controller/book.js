const express = require("express");
const Book = require("../model/book");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const sendToastError = require("../utils/sendToastError");
router.post("/create-book", async (req, res, next) => {
  try {
    const {
      bookCode,
      bookName,
      price,
      numberBook,
      yearPB,
      NXBCode,
      writer,
      type,
    } = req.body;
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
      type: type,
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
router.get("/get-book", async (req, res, next) => {
  try {
    const { bookCode } = req.query;

    // Tìm cuốn sách trong cơ sở dữ liệu dựa trên mã sách
    const book = await Book.findOne({ bookCode });

    // Kiểm tra xem cuốn sách có tồn tại không
    if (!book) {
      return sendToastError(res, "Book not found");
    }

    // Nếu cuốn sách tồn tại, trả về thông tin của nó
    return res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
router.get("/search-books", async (req, res, next) => {
  try {
    const { keyword } = req.query;
    console.log(keyword);
    // Tìm sách trong cơ sở dữ liệu dựa trên keyword
    const books = await Book.find({
      $or: [
        { bookName: { $regex: keyword, $options: "i" } }, // Tìm theo tên sách, không phân biệt chữ hoa chữ thường
        { bookCode: { $regex: keyword, $options: "i" } }, // Tìm theo mã sách, không phân biệt chữ hoa chữ thường
      ],
    });
    console.log(books);
    // Kiểm tra xem có sách nào được tìm thấy không
    if (books.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No books found" });
    }

    // Nếu có sách được tìm thấy, trả về danh sách các sách
    console.log(books);
    return res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.put("/update-book", async (req, res, next) => {
  try {
    const { bookCode } = req.body;
    const book = await Book.findOne({ bookCode });
    if (!book) {
      return sendToastError(res, "Book not found");
    }
    // Update book properties based on the request body
    book.bookName = req.body.bookName || book.bookName;
    book.price = req.body.price || book.price;
    book.numberBook = req.body.numberBook || book.numberBook;
    book.yearPB = req.body.yearPB || book.yearPB;
    book.NXBCode = req.body.NXBCode || book.NXBCode;
    book.writer = req.body.writer || book.writer;
    book.type = req.body.type || book.type;
    // Save the updated book to the database
    await book.save();

    // Return a success response
    return res
      .status(200)
      .json({ success: true, message: "Book updated successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
router.delete("/delete-book", async (req, res, next) => {
  try {
    const { bookCode } = req.body;

    // Tìm và xóa cuốn sách dựa trên bookCode
    const deletedBook = await Book.findOneAndDelete({ bookCode });

    // Kiểm tra xem cuốn sách có tồn tại không
    if (!deletedBook) {
      return sendToastError(res, "Book not found");
    }

    // Trả về một thông báo thành công
    return res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
