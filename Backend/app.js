const express = require("express");
const app = express();
const cors = require("cors");

const ErrorHandler = require("./middleware/error");

app.use(express.json());
app.use(cors());
//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}
const admin = require("./controller/admin.js");
const test = require("./controller/user.js");
const book = require("./controller/book.js");
const reader = require("./controller/reader.js");
const borrow = require("./controller/borrow.js");
app.use("/", test);
app.use("/api/admin", admin);
app.use("/api/book", book);
app.use("/api/reader", reader);
app.use("/api/borrow", borrow);
app.use(ErrorHandler);

module.exports = app;
