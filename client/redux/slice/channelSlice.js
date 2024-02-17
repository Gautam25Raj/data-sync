import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",

  initialState: {
    channels: [],
    joinedChannels: [],
    currentChannel: null,
  },

  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },

    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },

    updateChannels: (state, action) => {
      state.channels = state.channels.map((channel) =>
        channel._id === action.payload._id ? action.payload : channel
      );
    },

    deleteChannels: (state, action) => {
      state.channels = state.channels.filter(
        (channel) => channel._id !== action.payload
      );
    },

    setJoinedChannels: (state, action) => {
      state.joinedChannels = action.payload;
    },

    addJoinedChannel: (state, action) => {
      state.joinedChannels.push(action.payload);
    },

    leaveJoinedChannel: (state, action) => {
      state.joinedChannels = state.joinedChannels.filter(
        (channel) => channel._id !== action.payload
      );
    },

    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
});

export const {
  setChannels,
  addChannel,
  updateChannels,
  deleteChannels,
  setJoinedChannels,
  addJoinedChannel,
  leaveJoinedChannel,
  setCurrentChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
