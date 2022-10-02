import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../Authentication/AuthenticationSlice";
import searchReducer from "../AppHeader/searchSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    search: searchReducer,
  },
});
