import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
