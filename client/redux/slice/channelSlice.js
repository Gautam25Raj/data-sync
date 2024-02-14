import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",

  initialState: {
    channels: [],
    currentChannel: null,
  },

  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },

    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },

    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
});

export const { setChannels, addChannel, setCurrentChannel } =
  channelSlice.actions;

export default channelSlice.reducer;
