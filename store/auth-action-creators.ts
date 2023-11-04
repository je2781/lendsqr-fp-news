import AsyncStorage from "@react-native-async-storage/async-storage";
import authActions from "./auth-slice";
import type { AppDispatch } from "./index";

export function authenticateUser(token: string) {
  return (dispatch: AppDispatch) => {
    AsyncStorage.setItem("token", token).then((_) => {
      dispatch(
        authActions.authenticate({
          token: token,
        })
      );
    });
  };
}

export function logoutUser() {
  return (dispatch: AppDispatch) => {
    AsyncStorage.removeItem("token").then((_) => {
      dispatch(authActions.logout({}));
    });
  };
}

