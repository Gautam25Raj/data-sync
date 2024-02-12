const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth");
const {
  fetchMessage,
  fetchChatMessages,
  fetchChannelMessages,
  fetchLatestMessage,
  sendMessage,
  updateMessage,
  deleteMessage,
  deleteMessages,
} = require("../controllers/messageController");

router.route("/:messageId").get(authenticate, fetchMessage);
router.route("/chats/:chatId").get(authenticate, fetchChatMessages);
router.route("/channels/:channelId").get(authenticate, fetchChannelMessages);
router.route("/:chatId/latest-message").get(authenticate, fetchLatestMessage);

router.route("/").post(authenticate, sendMessage);

router.route("/:messageId").put(authenticate, updateMessage);

router.route("/:messageId").delete(authenticate, deleteMessage);
router.route("/:chatId").delete(authenticate, deleteMessages);

module.exports = router;
