const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth");
const {
  createChats,
  fetchChats,
  deleteChat,
} = require("../controllers/contactController");

router.route("/").get(authenticate, fetchChats);

router.route("/").post(authenticate, createChats);

router.route("/:chatId").delete(authenticate, deleteChat);

module.exports = router;
