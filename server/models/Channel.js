const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    tableau: {
      type: String,
      required: true,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = Channel = mongoose.model("Channel", channelSchema);
