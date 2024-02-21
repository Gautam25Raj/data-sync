const express = require("express");
const router = express.Router();

const {
  getChannel,
  getChannels,
  leaveChannel,
  createChannel,
  updateChannel,
  deleteChannel,
  getJoinedChannels,
  addContactToChannel,
} = require("../controllers/channelController");
const authenticate = require("../middleware/auth");

router.get("/", authenticate, getChannels);
router.get("/joined", authenticate, getJoinedChannels);
router.get("/:id", authenticate, getChannel);

router.post("/", authenticate, createChannel);
router.post("/:id", authenticate, leaveChannel);

router.put("/:id", authenticate, updateChannel);
router.put("/:id/add", authenticate, addContactToChannel);

router.delete("/:id", authenticate, deleteChannel);

module.exports = router;
