import { createSlice } from "@reduxjs/toolkit";
import { getProperties } from "./propertyActions";

const initialState = {
  properties: [],
  loading: false,
  error: false,
  filteredProperties: [],
};

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    filter: (state, action) => {
      state.filteredProperties = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProperties.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.properties = [];
        state.filteredProperties = [];
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload || [];
        state.filteredProperties = action.payload || [];
      })
      .addCase(getProperties.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.properties = [];
        state.filteredProperties = [];
      });
  },
});

export const { filter } = propertySlice.actions;
export default propertySlice.reducer;
