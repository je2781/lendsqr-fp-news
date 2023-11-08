import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux"; // Updated import
import store, { AppDispatch } from "../../../store/index";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";

import RegistrationScreen from "../../../screens/auth/RegistrationScreen";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
}));
//mocking firebase modules
jest.mock("@react-native-firebase/auth", () => () => ({
  signInWithEmailAndPassword: jest.fn((email: string, password: string) => {
    return {
      user: {
        getIdToken: jest.fn(() => {
          return "wjfoowkl-diow_rfgfa";
        }),
        uid: "23567225"
      }
    };
}),
  createUserWithEmailAndPassword: jest.fn((email: string, password: string) => {
      return {
        user: {
          getIdToken: jest.fn(() => {
            return "wjfoowkl-diow_23osp";
          }),
          uid: "235672"
        }
      };
  }),
  onAuthStateChanged: jest.fn(((user: any) => {

  }))
}));
jest.mock("@react-native-firebase/crashlytics", () => () => ({
  log: jest.fn(),
  setUserId: jest.fn(),
}));
jest.mock("@react-native-google-signin/google-signin", () => {
  return {
    GoogleSignin: {
      configure: jest.fn(),
    },
  };
});
jest.mock("@react-native-firebase/analytics", () => () => ({
  logEvent: jest.fn(),
}));
jest.mock("@react-native-firebase/remote-config", () => () => {
  return {
    getValue: jest.fn(function (name: string) {
      return {
        asString: jest.fn(),
      };
    }),
  };
});
jest.mock("@react-native-firebase/perf", () => () => {
  return {
    startTrace: jest.fn(),
    stopTrace: jest.fn(),
    putAttribute: jest.fn(),
  };
});
jest.mock("@react-native-firebase/messaging", () => () => {
  return {
    requestPermission: jest.fn(() => true),
  };
});

const navigationRef = createNavigationContainerRef();

describe("<RegistrationScreen/>", () => {
 it("dispatches action to update authtoken in redux store on press of register button", async () => {
    //mocking functions in registartion screen
    const handleRegistration = jest.fn(
      (input: {
        email: string;
        mobile: string;
        password: string;
        fullName: string;
      }) => {}
    );

    const dispatch = jest.fn((registerAction: any) => {});

    const registerAction = jest.fn( (token: string) => (dispatch: AppDispatch) => {});

    // Rendering AuthForm component using react-native-test-renderer.
    const registrationScreen = render(
      <Provider store={store}>
        <NavigationContainer>
          <RegistrationScreen
            registerAction={registerAction}
          />
        </NavigationContainer>
      </Provider>
    );

    //grabbing input components
    const emailTextInput = registrationScreen.getByTestId("emailI");
    const passwordTextInput = registrationScreen.getByTestId("passwordI");
    const fullNameTextInput = registrationScreen.getByTestId("fullNameI");
    const mobileTextInput = registrationScreen.getByTestId("mobileI");

    fireEvent.changeText(emailTextInput, "test@test.com");
    fireEvent.changeText(passwordTextInput, "8493003859jfkos");
    fireEvent.changeText(fullNameTextInput, "John Soros");
    fireEvent.changeText(mobileTextInput, "05205555994");

    if (navigationRef.isReady()) {

      //grabbing register button and performing action on it
      const button = registrationScreen.getByTestId("registerButton");

      fireEvent.press(button);

      expect(handleRegistration).toHaveBeenCalledTimes(1);
      // Expect register action to be dispatched
      expect(dispatch).toHaveBeenCalledWith(
        registerAction('wjfoowkl-diow_23osp')
      );
    }
  });
});
