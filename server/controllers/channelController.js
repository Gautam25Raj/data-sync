const Channel = require("../models/Channel");
const User = require("../models/User");
const Message = require("../models/Message");

const getChannel = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.userData;

  try {
    if (!id) {
      throw new Error("Channel ID is required");
    }

    if (!currentUser || !currentUser.id) {
      throw new Error("Invalid user data");
    }

    const channel = await Channel.findById(id).populate("users", "-password");

    if (!channel) {
      throw new Error("Channel not found");
    }

    if (channel.admin.toString() !== currentUser.id) {
      throw new Error("You are not authorized to view this channel");
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
    if (!currentUser || !currentUser.id) {
      throw new Error("Invalid user data");
    }

    const channels = await Channel.find({ admin: currentUser.id }).select(
      "-admin"
    );

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
    const userChannels = await Channel.find({ admin: currentUser.id });

    if (userChannels.length >= 2) {
      throw new Error("You cannot create more than 2 channels.");
    }

    if (!name) {
      throw new Error("Name is required");
    }

    if (!Array.isArray(users)) {
      throw new Error("Users must be an array");
    }

    const userIds = [];
    for (let user of users) {
      let foundUser;
      if (user.includes("@")) {
        foundUser = await User.findOne({ email: user });
        if (!foundUser) {
          throw new Error(`User with email ${user} not found`);
        }
      } else {
        foundUser = await User.findOne({ username: user });
        if (!foundUser) {
          throw new Error(`User with username ${user} not found`);
        }
      }
      userIds.push(foundUser._id);
    }

    if (!userIds.includes(currentUser.id)) {
      userIds.push(currentUser.id);
    }

    const newChannel = new Channel({
      name,
      users: userIds,
      admin: currentUser.id,
    });

    const channel = await newChannel.save();
    channel.admin = undefined;

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
  const { name, users } = req.body;

  try {
    if (!id) {
      throw new Error("Channel ID is required");
    }

    if (!currentUser || !currentUser.id) {
      throw new Error("Invalid user data");
    }

    let channel = await Channel.findById(id);

    if (!channel) {
      throw new Error("Channel not found");
    }

    if (channel.admin.toString() !== currentUser.id) {
      throw new Error("You are not authorized to update this channel");
    }

    let updateData = {};

    if (name) {
      updateData.name = name;
    }

    if (users && users.length) {
      let userIds = [...channel.users];

      for (let user of users) {
        let foundUser;

        if (user.includes("@")) {
          foundUser = await User.findOne({ email: user });

          if (!foundUser) {
            throw new Error(`User with email ${user} not found`);
          }
        } else {
          foundUser = await User.findOne({ username: user });

          if (!foundUser) {
            throw new Error(`User with username ${user} not found`);
          }
        }

        if (!userIds.includes(foundUser._id)) {
          userIds.push(foundUser._id);
        }
      }

      updateData.users = userIds;
    }

    if (!Object.keys(updateData).length) {
      throw new Error("No fields to update");
    }

    channel = await Channel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    channel.admin = undefined;

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: "Error updating channel",
      error: error.message,
    });
  }
};

const addContactToChannel = async (req, res) => {
  const { id } = req.params;
  const { contactId } = req.body;

  try {
    if (!id) {
      throw new Error("Channel ID is required");
    }

    if (!contactId) {
      throw new Error("Contact ID is required");
    }

    const channel = await Channel.findById(id);

    if (!channel) {
      throw new Error("Channel not found");
    }

    const contact = await User.findById(contactId);

    if (!contact) {
      throw new Error("Contact not found");
    }

    if (channel.users.includes(contactId)) {
      throw new Error("Contact already in channel");
    }

    channel.users.push(contactId);
    const updatedChannel = await channel.save();

    res.status(200).json(updatedChannel);
  } catch (error) {
    res.status(500).json({
      message: "Error adding contact to channel",
      error: error.message,
    });
  }
};

const deleteChannel = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.userData;

  try {
    if (!id) {
      throw new Error("Channel ID is required");
    }

    if (!currentUser || !currentUser.id) {
      throw new Error("Invalid user data");
    }

    const channel = await Channel.findById(id);

    if (!channel) {
      throw new Error("Channel not found");
    }

    if (channel.admin.toString() !== currentUser.id) {
      throw new Error("You are not authorized to delete this channel");
    }

    await Channel.deleteOne({ _id: id });
    await Message.deleteMany({ channel: id });

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

const getJoinedChannels = async (req, res) => {
  const currentUser = req.userData;

  try {
    const channels = await Channel.find({
      users: currentUser.id,
      admin: { $ne: currentUser.id },
    }).select("-admin");

    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching channels for this user.",
      error: error.message,
    });
  }
};

const leaveChannel = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.userData;

  try {
    if (!id) {
      throw new Error("Channel ID is required");
    }

    if (!currentUser || !currentUser.id) {
      throw new Error("Invalid user data");
    }

    const channel = await Channel.findById(id);

    if (!channel) {
      throw new Error("Channel not found");
    }

    if (channel.admin.toString() === currentUser.id) {
      throw new Error("You cannot leave a channel you created");
    }

    await Channel.findByIdAndUpdate(
      id,
      { $pull: { users: currentUser.id } },
      { new: true }
    );

    res.status(200).json({
      message: "You have left the channel successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error leaving channel",
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
  getJoinedChannels,
  leaveChannel,
  addContactToChannel,
};
