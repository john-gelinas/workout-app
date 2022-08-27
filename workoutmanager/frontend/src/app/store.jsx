import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import themeReducer from "./themeSlice";
import authReducer from "../components/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme: themeReducer,
    auth: authReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
