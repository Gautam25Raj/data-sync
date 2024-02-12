const Chat = require("../models/Contact");
const Message = require("../models/Message");
const Channel = require("../models/Channel");

exports.fetchMessage = async (req, res) => {
  const { messageId } = req.params;

  if (!messageId) {
    return res.status(400).json({ message: "Message Id not provided." });
  }

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchChatMessages = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ message: "Contact Id not provided." });
  }

  try {
    const chatExists = await Chat.findById(chatId);

    if (!chatExists) {
      return res.status(404).json({ message: "Contact not found." });
    }

    const messages = await Message.find({ chat: chatId }).sort("createdAt");

    if (!messages) {
      return res
        .status(404)
        .json({ message: "No messages found for this contact." });
    }

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchChannelMessages = async (req, res) => {
  const { channelId } = req.params;

  if (!channelId) {
    return res.status(400).json({ message: "Channel Id not provided." });
  }

  try {
    const channelExists = await Channel.findById(channelId);

    if (!channelExists) {
      return res.status(404).json({ message: "Channel not found." });
    }

    const messages = await Message.find({ chat: channelId })
      .sort("createdAt")
      .populate("sender", "username");

    if (!messages) {
      return res
        .status(404)
        .json({ message: "No messages found for this channel." });
    }

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchLatestMessage = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ message: "Contact Id not provided." });
  }

  const chatExists = await Chat.findById(chatId);

  if (!chatExists) {
    return res.status(404).json({ message: "Contact not found." });
  }

  try {
    const message = await Message.findOne({ chat: chatId }).sort("-createdAt");

    if (!message) {
      return res
        .status(404)
        .json({ message: "No messages found for this chat" });
    }

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { chatId, content } = req.body;
  const { id: sender } = req.userData;

  if (!chatId || !content) {
    return res.status(400).json({ message: "Contact or message not sent." });
  }

  const newMessage = {
    sender,
    content,
    chat: chatId,
  };

  try {
    const chatExists = await Chat.findById(chatId);

    if (!chatExists) {
      return res.status(404).json({ message: "Contact not found." });
    }

    const message = await Message.create(newMessage);

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { content } = req.body;

  if (!messageId || !content) {
    return res
      .status(400)
      .json({ message: "Message Id or content not provided." });
  }

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }

    message.content = content;
    const updatedMessage = await message.save();

    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  if (!messageId) {
    return res.status(400).json({ message: "Message Id not provided." });
  }

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }

    await Message.findByIdAndDelete(messageId);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMessages = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ message: "Contact Id not provided." });
  }

  const chatExists = await Chat.findById(chatId);

  if (!chatExists) {
    return res.status(404).json({ message: "Chat not found" });
  }

  try {
    await Message.deleteMany({ chat: chatId });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
