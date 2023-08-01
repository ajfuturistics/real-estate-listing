import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  users: [],
  user: null,
  saved: [],
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
    saveItem: (state, action) => {
      state.saved = [...state.saved, action.payload];
    },
    removeSaveItem: (state, action) => {
      state.saved = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, register, saveItem, removeSaveItem } =
  userSlice.actions;

export default userSlice.reducer;
