// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import contactSlice from "./contactSlice";
import customerSlice from "./customerSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    contact:contactSlice,
    customer:customerSlice
  },
});
