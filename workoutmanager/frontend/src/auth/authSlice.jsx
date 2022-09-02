import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoading(state, action) {
      state.isLoading = true;
      state.isAuthenticated = null;
    },
    loadUser(state, action) {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loadUserToken(state, action) {
      const localToken = localStorage.getItem("token");
      if (localToken && !state.token) {
        state.token = localToken;
      }
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
      localStorage.removeItem("token");
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
  },
});

export const {
  userLoading,
  loadUserToken,
  loadUser,
  authError,
  userLoginSuccess,
  userLoginFail,
  userLogout,
} = authSlice.actions;

export default authSlice.reducer;
