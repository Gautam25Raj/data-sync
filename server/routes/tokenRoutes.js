const express = require("express");
const router = express.Router();

const refreshToken = require("../middleware/refreshToken");

router.get("/", refreshToken, (req, res) => {
  res.json({ token: req.token });
});

module.exports = router;
