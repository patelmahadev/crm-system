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

export const addContact = createAsyncThunk(
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

export const editContact = createAsyncThunk(
  "auth/",
  async (userData) => {
    try {
      const response = await api.put(
        "https://api.example.com/signup",
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteContact = createAsyncThunk(
  "auth/signupUser",
  async (userData) => {
    try {
      const response = await api.delete(
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

      .addCase(addContact.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default authSlice.reducer;
