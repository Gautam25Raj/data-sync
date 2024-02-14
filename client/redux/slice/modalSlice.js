import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",

  initialState: {
    newChannelModal: false,
  },

  reducers: {
    togglenewChannelModal: (state) => {
      state.newChannelModal = !state.newChannelModal;
    },
  },
});

export const { togglenewChannelModal } = modalSlice.actions;

export default modalSlice.reducer;
