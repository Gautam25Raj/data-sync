"use client";

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import ablyReducer from "./slice/ablySlice";
import modalReducer from "./slice/modalSlice";
import channelReducer from "./slice/channelSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ably: ablyReducer,
    modal: modalReducer,
    channel: channelReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
