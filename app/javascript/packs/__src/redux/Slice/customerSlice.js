import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../api";

export const fetchData = createAsyncThunk("auth/fetchData", async () => {
  try {
    const response = await api.get("https://api.example.com/data");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addCustomer = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    try {
      const response = await api.post(
        "https://api.example.com/login",
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


const initialState = {
  data: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(addCustomer.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default authSlice.reducer;
