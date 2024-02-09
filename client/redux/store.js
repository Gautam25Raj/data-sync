"use client";

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import ablyReducer from "./slice/ablySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ably: ablyReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
