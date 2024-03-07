const express = require("express");
const router = express.Router();

const { ablyAuth } = require("../controllers/ablyController");

router.route("/auth/:userId").get(ablyAuth);

module.exports = router;
