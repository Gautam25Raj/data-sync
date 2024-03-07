import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",

  initialState: {
    confirmModal: false,
    newChannelModal: false,
    newContactModal: false,
    editChannelModal: false,
  },

  reducers: {
    toggleConfirmModal: (state) => {
      state.confirmModal = !state.confirmModal;
    },

    togglenewChannelModal: (state) => {
      state.newChannelModal = !state.newChannelModal;
    },

    toggleNewContactModal: (state) => {
      state.newContactModal = !state.newContactModal;
    },

    toggleEditChannelModal: (state) => {
      state.editChannelModal = !state.editChannelModal;
    },
  },
});

export const {
  toggleConfirmModal,
  togglenewChannelModal,
  toggleNewContactModal,
  toggleEditChannelModal,
} = modalSlice.actions;

export default modalSlice.reducer;
