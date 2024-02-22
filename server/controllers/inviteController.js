const Channel = require("../models/Channel");

const joinChannel = async (req, res) => {
  const { channelId } = req.body;
  const currentUser = req.userData;

  try {
    if (!channelId) {
      throw new Error("Channel Id is required.");
    }

    if (!currentUser) {
      throw new Error("User not authenticated.");
    }

    const foundChannel = await Channel.findById(channelId);

    if (!foundChannel) {
      throw new Error(`Channel with id ${channelId} not found`);
    }

    if (foundChannel.users.includes(currentUser.id)) {
      return res.status(409).json({ error: "User already in channel" });
    }

    foundChannel.users.push(currentUser.id);

    const savedChannel = await foundChannel.save();

    res.status(200).json(savedChannel);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error joining channel.", error: error.message });
  }
};

module.exports = { joinChannel };
