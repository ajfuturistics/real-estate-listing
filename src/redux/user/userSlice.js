import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  users: [],
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    register: (state, action) => {
      state.users = [...state.users, action.payload];
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, register } = userSlice.actions;

export default userSlice.reducer;
