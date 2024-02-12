const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth");
const {
  fetchMessage,
  fetchChatMessages,
  fetchChannelMessages,
  fetchLatestMessage,
  sendChatMessage,
  sendChannelMessage,
  updateMessage,
  deleteMessage,
  deleteChatMessages,
  deleteChannelMessages,
} = require("../controllers/messageController");

router.route("/:messageId").get(authenticate, fetchMessage);
router.route("/chats/:chatId").get(authenticate, fetchChatMessages);
router.route("/channels/:channelId").get(authenticate, fetchChannelMessages);
router.route("/:chatId/latest-message").get(authenticate, fetchLatestMessage);

router.route("/chat").post(authenticate, sendChatMessage);
router.route("/channel").post(authenticate, sendChannelMessage);

router.route("/:messageId").put(authenticate, updateMessage);

router.route("/:messageId").delete(authenticate, deleteMessage);
router.route("/chat/:chatId").delete(authenticate, deleteChatMessages);
router.route("/channel/:channelId").delete(authenticate, deleteChannelMessages);

module.exports = router;
