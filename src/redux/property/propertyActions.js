import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProperties = createAsyncThunk(
  "userList/getProperties",
  async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/ajfuturistics/real-estate-listing/master/src/data/data.json"
      );

      return response.data.property;
    } catch (err) {
      console.log(err);
    }
  }
);
