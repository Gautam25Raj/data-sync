const express = require("express");
const router = express.Router();

const { ablyAuth, createChannel } = require("../controllers/ablyController");

router.route("/auth/:userId").get(ablyAuth);
router.route("/create-channel/:chatId").get(createChannel);

module.exports = router;
