import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",

  initialState: {
    isAdmin: true,
    channels: [],
    joinedChannels: [],
    searchedJoinedChannels: [],
    currentChannel: null,
  },

  reducers: {
    setIsadmin: (state, action) => {
      state.isAdmin = action.payload;
    },

    setChannels: (state, action) => {
      state.channels = action.payload;
    },

    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },

    updateChannel: (state, action) => {
      state.channels = state.channels.map((channel) =>
        channel._id === action.payload._id ? action.payload : channel
      );
    },

    deleteChannel: (state, action) => {
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

    setSearchedJoinedChannels: (state, action) => {
      state.searchedJoinedChannels = action.payload;
    },

    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },

    removeCurrentChannel: (state) => {
      state.currentChannel = null;
    },
  },
});

export const {
  setIsadmin,
  setChannels,
  addChannel,
  updateChannel,
  deleteChannel,
  setJoinedChannels,
  setSearchedJoinedChannels,
  addJoinedChannel,
  leaveJoinedChannel,
  setCurrentChannel,
  removeCurrentChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
