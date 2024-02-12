const Chat = require("../models/Contact");
const Message = require("../models/Message");

const fetchChats = async (req, res) => {
  const currentUser = req.userData;

  if (!currentUser) {
    return res.status(400).json({ message: "User not authenticated." });
  }

  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: currentUser.id } },
    })
      .populate("latestMessage")
      .select("_id users latestMessage type");

    res.status(200).json(chats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createChats = async (req, res) => {
  const { userId, message, contactType } = req.body;
  const currentUser = req.userData;

  if (!userId) {
    return res.status(400).json({ message: "No user exist with this Id." });
  }

  if (!message) {
    return res.status(400).json({ message: "Message is required." });
  }

  if (!currentUser) {
    return res.status(400).json({ message: "User not authenticated." });
  }

  try {
    const existingChat = await Chat.findOne({
      $and: [
        { users: { $elemMatch: { $eq: currentUser.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    });

    if (existingChat) {
      const { _id, users, latestMessage, type } = existingChat;

      res.status(200).json({ _id, users, latestMessage, type });
    } else {
      const chatData = {
        users: [currentUser.id, userId],
        type: contactType,
      };

      const createdChat = await Chat.create(chatData);

      let latestMessage = null;

      if (message) {
        const createdMessage = await Message.create({
          type: "text",
          sender: currentUser.id,
          content: message,
          chat: createdChat._id,
        });
        latestMessage = createdMessage._id;

        await Chat.updateOne({ _id: createdChat._id }, { latestMessage });
      }

      res.status(200).json({
        _id: createdChat._id,
        users: createdChat.users,
        latestMessage,
        type: createdChat.type,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteChat = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ message: "No chat ID provided." });
  }

  try {
    const chat = await Chat.findByIdAndDelete(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createChats, fetchChats, deleteChat };
