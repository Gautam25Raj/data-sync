import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    ablyToken: null,
  },

  reducers: {
    updateAblyToken: (state, action) => {
      state.ablyToken = action.payload;
    },
  },
});

export const { updateAblyToken } = userSlice.actions;

export default userSlice.reducer;
