const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },

    type: {
      type: String,
      enum: ["personal", "group"],
      default: "personal",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = Chat = mongoose.model("Chat", ChatSchema);
