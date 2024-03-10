"use client";

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import ablyReducer from "./slice/ablySlice";
import modalReducer from "./slice/modalSlice";
import channelReducer from "./slice/channelSlice";
import messageReducer from "./slice/messageSlice";
import contactReducer from "./slice/contactSlice";
import siteReducer from "./slice/siteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ably: ablyReducer,
    modal: modalReducer,
    channel: channelReducer,
    message: messageReducer,
    contact: contactReducer,
    site: siteReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
