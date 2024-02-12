const express = require("express");
const router = express.Router();

const {
  createChannel,
  getChannels,
  getChannel,
  updateChannel,
  deleteChannel,
} = require("../controllers/channelController");
const authenticate = require("../middleware/auth");

router.get("/", authenticate, getChannels);
router.get("/:id", authenticate, getChannel);

router.post("/", authenticate, createChannel);

router.put("/:id", authenticate, updateChannel);

router.delete("/:id", authenticate, deleteChannel);

module.exports = router;
