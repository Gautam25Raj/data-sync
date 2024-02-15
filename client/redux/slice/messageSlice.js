import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",

  initialState: {
    messages: [],
  },

  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    updateMessage: (state, action) => {
      const { messageId, text } = action.payload;

      const message = state.messages.find(
        (message) => message._id === messageId
      );

      if (message) {
        message.text = text;
      }
    },

    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message._id !== action.payload
      );
    },

    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const {
  setMessages,
  addMessage,
  updateMessage,
  removeMessage,
  clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;
