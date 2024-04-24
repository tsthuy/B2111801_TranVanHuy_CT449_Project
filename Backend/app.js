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
app.use("/", test);
app.use("/api/admin", admin);
app.use(ErrorHandler);

module.exports = app;
