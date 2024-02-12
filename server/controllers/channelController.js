const Channel = require("../models/Channel");

const getChannel = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.userData;

  if (!id) return res.status(400).json({ message: "Channel ID is required" });

  try {
    const channel = await Channel.findById(id).populate("users", "-password");

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    if (channel.admin.toString() !== currentUser.id) {
      return res.status(403).json({
        message: "You are not authorized to view this channel",
      });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching channel",
      error: error.message,
    });
  }
};

const getChannels = async (req, res) => {
  const currentUser = req.userData;

  try {
    const channels = await Channel.find({ admin: currentUser.id });

    if (!channels || channels.length === 0) {
      return res.status(404).json({
        message: "No channels found for the current user",
      });
    }

    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching channels",
      error: error.message,
    });
  }
};

const createChannel = async (req, res) => {
  const { name, users = [] } = req.body;
  const currentUser = req.userData;

  try {
    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const existingChannel = await Channel.findOne({ name });
    if (existingChannel) {
      return res.status(400).json({
        message: "A channel with this name already exists",
      });
    }

    if (!Array.isArray(users)) {
      return res.status(400).json({
        message: "Users must be an array",
      });
    }

    if (!users.includes(currentUser.id)) {
      users.push(currentUser.id);
    }

    const newChannel = new Channel({
      name,
      users,
      admin: currentUser.id,
    });

    await newChannel.save();

    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({
      message: "Error creating channel",
      error: error.message,
    });
  }
};

const updateChannel = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.userData;
  const { name, users = [] } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  try {
    let channel = await Channel.findById(id);

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    if (channel.admin.toString() !== currentUser.id) {
      return res.status(403).json({
        message: "You are not authorized to update this channel",
      });
    }

    if (!users.includes(currentUser.id)) {
      users.push(currentUser.id);
    }

    channel = await Channel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Channel updated successfully",
      channel,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating channel",
      error: error.message,
    });
  }
};

const deleteChannel = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.userData;

  try {
    const channel = await Channel.findById(id);

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    if (channel.admin.toString() !== currentUser.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this channel",
      });
    }

    await Channel.deleteOne({ _id: id });

    res.status(200).json({
      message: "Channel deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting channel",
      error: error.message,
    });
  }
};

module.exports = {
  getChannel,
  getChannels,
  createChannel,
  updateChannel,
  deleteChannel,
};
