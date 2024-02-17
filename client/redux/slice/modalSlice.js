import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",

  initialState: {
    newChannelModal: false,
    newContactModal: false,
  },

  reducers: {
    togglenewChannelModal: (state) => {
      state.newChannelModal = !state.newChannelModal;
    },

    toggleNewContactModal: (state) => {
      state.newContactModal = !state.newContactModal;
    },
  },
});

export const { togglenewChannelModal, toggleNewContactModal } =
  modalSlice.actions;

export default modalSlice.reducer;
