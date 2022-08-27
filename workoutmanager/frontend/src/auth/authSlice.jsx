import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoading(state, action) {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    userLoaded: {
      reducer(state, action) {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
        state.token = localStorage.getItem("token");
      },
      prepare(data) {
        return {
          payload: data,
        };
      },
    },
    userLoginSuccess: {
      reducer(state, action) {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      },
      prepare(data) {
        return {
          payload: data,
        };
      },
    },
    userLoginFail(state, action) {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
      state.token = null;
    },
    userLogout(state, action) {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    authError(state, action) {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    applyLocalToken(state, action) {
      token = localStorage.getItem("token");
      if (token) {
        state.token = token;
      }
    },
  },
});

export const {
  userLoading,
  userLoaded,
  authError,
  userLoginSuccess,
  userLoginFail,
  applyLocalToken,
  userLogout,
} = authSlice.actions;

export default authSlice.reducer;
