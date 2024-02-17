import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    user: {
      _id: "65cd2ba91a2b26cb78a132cb",
      email: "gautam@gg.com",
      username: "gautam",
    },
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
