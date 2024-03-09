const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    clientId: {
      type: String,
      required: true,
    },

    appSecretId: {
      type: String,
      required: true,
    },

    appSecretValue: {
      type: String,
      required: true,
    },

    patName: {
      type: String,
      required: true,
    },

    patSecret: {
      type: String,
      required: true,
    },

    baseUrl: {
      type: String,
      required: true,
    },

    siteName: {
      type: String,
      required: true,
    },
  },

  {
    versionKey: false,
  }
);

module.exports = Site = mongoose.model("Site", siteSchema);
