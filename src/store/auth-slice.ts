import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  login: true,
  registration: false,
  authToken: null,
  isInitializing: true
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setNewsApiInitialization(state, action) {
      state.isInitializing = action.payload.isInitializing;
    },
    authenticate(state, action) {
        state.authToken = action.payload.token;
        state.login = initialAuthState.login;
        state.registration = initialAuthState.registration;
    },
    logout(state, action) {
        state.authToken = action.payload;
    }
  },
});

export default authSlice.actions;
