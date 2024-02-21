import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",

  initialState: {
    contacts: [],
    isGroup: false,
    currentContact: null,
    originalContacts: [],
  },

  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
    },

    addContact(state, action) {
      state.contacts.push(action.payload);
    },

    deleteContact(state, action) {
      console.log(state.contacts);
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== action.payload
      );
    },

    updateLatestMessage(state, action) {
      state.contacts.map((contact) => {
        if (contact._id === action.payload.chatId) {
          contact.latestMessage = { content: action.payload.message.content };
        }
      });
    },

    setOriginalContacts(state, action) {
      state.originalContacts = action.payload;
    },

    addOriginalContact(state, action) {
      state.originalContacts.push(action.payload);
    },

    setSelectedContact(state, action) {
      state.currentContact = action.payload;
    },

    removeSelectedContact(state) {
      state.currentContact = null;
    },

    toggleGroup(state) {
      state.isGroup = !state.isGroup;
    },

    setGroup(state, action) {
      state.isGroup = action.payload;
    },
  },
});

export const {
  addContact,
  setContacts,
  deleteContact,
  updateLatestMessage,
  addOriginalContact,
  setOriginalContacts,
  setSelectedContact,
  removeSelectedContact,
  toggleGroup,
  setGroup,
} = contactSlice.actions;

export default contactSlice.reducer;
