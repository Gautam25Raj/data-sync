"use client";

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import ablyReducer from "./slice/ablySlice";
import modalReducer from "./slice/modalSlice";
import channelReducer from "./slice/channelSlice";
import messageReducer from "./slice/messageSlice";
import contactReducer from "./slice/contactSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ably: ablyReducer,
    modal: modalReducer,
    channel: channelReducer,
    message: messageReducer,
    contact: contactReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
