import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Authentication/AuthenticationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
