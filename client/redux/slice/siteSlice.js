import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice({
  name: "site",

  initialState: {
    sites: [],
    currentSite: null,
    currentActionSite: null,
  },

  reducers: {
    setSite: (state, action) => {
      state.sites = action.payload;
    },

    addCreatedSite: (state, action) => {
      state.sites.push(action.payload);
    },

    updateSite: (state, action) => {
      state.sites = state.sites.map((site) =>
        site._id === action.payload._id ? action.payload : site
      );
    },

    deleteSite: (state, action) => {
      state.sites = state.sites.filter((site) => site._id !== action.payload);
    },

    clearSite: (state) => {
      state.sites = [];
    },

    setCurrentSite: (state, action) => {
      state.currentSite = action.payload;
    },

    clearCurrentSite: (state) => {
      state.currentSite = null;
    },

    setCurrentActionSite: (state, action) => {
      state.currentActionSite = action.payload;
    },

    clearCurrentActionSite: (state) => {
      state.currentActionSite = null;
    },
  },
});

export const {
  setSite,
  addCreatedSite,
  updateSite,
  deleteSite,
  clearSite,
  setCurrentSite,
  clearCurrentSite,
  setCurrentActionSite,
  clearCurrentActionSite,
} = siteSlice.actions;

export default siteSlice.reducer;
