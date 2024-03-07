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

module.exports = { ablyAuth };
