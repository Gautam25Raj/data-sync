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
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== action.payload
      );
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
  },
});

export const {
  addContact,
  setContacts,
  deleteContact,
  addOriginalContact,
  setOriginalContacts,
  setSelectedContact,
  removeSelectedContact,
  toggleGroup,
} = contactSlice.actions;

export default contactSlice.reducer;
