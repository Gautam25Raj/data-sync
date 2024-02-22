const express = require("express");
const router = express.Router();

const inviteController = require("../controllers/inviteController");
const authenticate = require("../middleware/auth");

router.post("/", authenticate, inviteController.joinChannel);

module.exports = router;
