import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  login: false,
  registration: false,
  authToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    switchToLogin(state, action) {
      state.login = true;
    },
    switchToRegistration(state, action) {
      state.registration = true;
    },
    authenticate(state, action) {
        state.authToken = action.payload.token;
        state.login = false;
        state.registration = false;
    },
    logout(state, action) {
        state.authToken = null;
    }
  },
});

export default authSlice.actions;
