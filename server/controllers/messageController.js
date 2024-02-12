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
  } catch (error) {
    res.status(500).json({
      message: "Error fetching message.",
      error: error.message,
    });
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
  } catch (error) {
    res.status(500).json({
      message: "Error fetching messages for this chat.",
      error: error.message,
    });
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
  } catch (error) {
    res.status(500).json({
      message: "Error fetching messages for this channel.",
      error: error.message,
    });
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
  } catch (error) {
    res.status(500).json({
      message: "Error fetching latest message.",
      error: error.message,
    });
  }
};

exports.sendChatMessage = async (req, res) => {
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
    res.status(400).json({
      message: "Error sending message to chat.",
      error: error.message,
    });
  }
};

exports.sendChannelMessage = async (req, res) => {
  const { channelId, content } = req.body;
  const { id: sender } = req.userData;

  if (!channelId || !content) {
    return res.status(400).json({ message: "Channel or message not sent." });
  }

  const newMessage = {
    sender,
    content,
    channel: channelId,
  };

  try {
    const channelExists = await Channel.findById(channelId);

    if (!channelExists) {
      return res.status(404).json({ message: "Channel not found." });
    }

    const message = await Message.create(newMessage);

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({
      message: "Error sending message to channel.",
      error: error.message,
    });
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
  } catch (error) {
    res.status(500).json({
      message: "Error updating message.",
      error: error.message,
    });
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

    res.status(200).json({ message: "Message deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteChatMessages = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ message: "Contact Id not provided." });
  }

  const chatExists = await Chat.findById(chatId);

  if (!chatExists) {
    return res.status(404).json({ message: "Chat not found." });
  }

  try {
    await Message.deleteMany({ chat: chatId });

    res.status(200).json({ message: "Chat messages deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteChannelMessages = async (req, res) => {
  const { channelId } = req.params;

  if (!channelId) {
    return res.status(400).json({ message: "Contact Id not provided." });
  }

  const channelExists = await Channel.findById(channelId);

  if (!channelExists) {
    return res.status(404).json({ message: "Channel not found." });
  }

  try {
    await Message.deleteMany({ channel: channelId });

    res.status(200).json({ message: "Channel messages deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
