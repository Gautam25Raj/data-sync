const Chat = require("../models/Contact");
const Message = require("../models/Message");

const fetchChats = async (req, res) => {
  const currentUser = req.userData;

  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: currentUser.id } },
    })
      .populate("latestMessage", "content -_id")
      .populate("users", "username")
      .select("_id users latestMessage type");

    res.status(200).json(chats);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching chats.", error: error.message });
  }
};

const createChats = async (req, res) => {
  const { userId, message } = req.body;
  const currentUser = req.userData;

  try {
    if (!userId) {
      throw new Error("User Id is required.");
    }

    if (!message) {
      throw new Error("Message is required.");
    }

    if (!currentUser) {
      throw new Error("User not authenticated.");
    }

    const existingChat = await Chat.findOne({
      $and: [
        { users: { $elemMatch: { $eq: currentUser.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    }).populate("latestMessage", "content");

    if (existingChat) {
      res.status(200).json(existingChat);
    } else {
      const chatData = {
        users: [currentUser.id, userId],
      };

      let createdChat = await Chat.create(chatData);

      let latestMessage = null;

      if (message) {
        const createdMessage = await Message.create({
          type: "text",
          sender: currentUser.id,
          content: message,
          chat: createdChat._id,
        });
        latestMessage = createdMessage;

        await Chat.updateOne(
          { _id: createdChat._id },
          { latestMessage: latestMessage._id }
        );
      }

      res.status(200).json({
        _id: createdChat._id,
        users: createdChat.users,
        latestMessage: { content: latestMessage.content },
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating chat.", error: error.message });
  }
};

const deleteChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    if (!chatId) {
      throw new Error("Chat ID is required.");
    }

    const chat = await Chat.findByIdAndDelete(chatId);

    if (!chat) {
      throw new Error("Chat not found.");
    }

    res.status(200).json({ message: "Chat deleted successfully." });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting chat.", error: error.message });
  }
};

module.exports = { createChats, fetchChats, deleteChat };
