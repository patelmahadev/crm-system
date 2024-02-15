import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("auth/fetchData", async () => {
  try {
    const response = await axios.get("https://api.example.com/data");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const loginUser = createAsyncThunk(
  "api/user/loginUser",
  async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/loginUser",
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const signupUser = createAsyncThunk(
  "api/user/signupUser",
  async (userData) => {
    try {
      const response = await axios.post(
        "https://api.example.com/signup",
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default authSlice.reducer;
