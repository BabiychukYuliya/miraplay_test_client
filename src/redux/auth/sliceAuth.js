import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload.user;

      if (action.payload.token) {
        state.token = action.payload.token;
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});
export const authReducer = authSlice.reducer;
export const { loadUser, logOut } = authSlice.actions;
