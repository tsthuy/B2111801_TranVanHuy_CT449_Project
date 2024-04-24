const express = require("express");
const router = express.Router();

router.get("/test", async (req, res, next) => {
  res.send("hehehehe");
});
module.exports = router;
