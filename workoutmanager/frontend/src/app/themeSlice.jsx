import { createSlice } from "@reduxjs/toolkit";

const initialState = { mode: "dark" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme(state, action) {
      const theme = action.payload;
      state.mode = theme;
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
