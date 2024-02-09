import { createSlice } from "@reduxjs/toolkit";

const ablySlice = createSlice({
  name: "ably",

  initialState: {
    ably: null,
    spaces: null,
    currentSpace: null,
  },

  reducers: {
    updateAblyInstance: (state, action) => {
      state.ably = action.payload;
    },

    updateSpaces: (state, action) => {
      state.spaces = action.payload;
    },

    updateCurrentSpace: (state, action) => {
      state.currentSpace = action.payload;
    },
  },
});

export const { updateAblyInstance, updateSpaces, updateCurrentSpace } =
  ablySlice.actions;

export default ablySlice.reducer;
