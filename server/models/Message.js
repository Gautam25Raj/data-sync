const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "text",
      required: true,
    },

    sender: {
      type: String,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      trim: true,
      required: true,
    },

    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = Message = mongoose.model("Message", MessageSchema);
