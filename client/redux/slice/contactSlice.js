import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",

  initialState: {
    contacts: [],
    originalContacts: [{ name: "a" }],
    currentContacts: null,
  },

  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
    },

    addContact(state, action) {
      state.contacts.push(action.payload);
    },

    removeContact(state, action) {
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
      state.currentContacts = action.payload;
    },
  },
});

export const {
  addContact,
  setContacts,
  removeContact,
  addOriginalContact,
  setOriginalContacts,
  setSelectedContact,
} = contactSlice.actions;

export default contactSlice.reducer;
