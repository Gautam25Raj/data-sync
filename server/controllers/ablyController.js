const Ably = require("ably");

require("dotenv").config();

const apiKey = process.env.ABLY_API_KEY;
const ably = new Ably.Rest({
  key: apiKey,
  cipher: {
    key: process.env.ABLY_CIPHER_KEY,
    algorithm: "aes",
    keyLength: 256,
    mode: "cbc",
  },
});

const ablyAuth = (req, res) => {
  console.log("Successfully connected to the server auth endpoint");

  try {
    const { userId } = req.params;

    const authOptions = {
      capability: {
        "*": ["publish", "subscribe", "presence"],
      },
      clientId: userId,
    };

    ably.auth.createTokenRequest(authOptions, (err, tokenRequest) => {
      if (err) {
        res.status(500).send("Error creating TokenRequest: " + err);
      } else {
        res.status(200).send(tokenRequest);
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Error Initializing Ably." });
  }
};

const createChannel = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const channelName = `chatId-${chatId}`;

    const channel = ably.channels.get(channelName);

    return res.status(200).json({ channel: channel.name });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { ablyAuth, createChannel };
