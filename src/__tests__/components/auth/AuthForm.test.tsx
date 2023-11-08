import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux"; // Updated import
import store, { AppDispatch } from "../../../store/index";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";

import AuthForm from "../../../components/auth/AuthForm";
import authRepo from "../../../repository/auth/auth-repo";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
}));
//mocking firebase modules
jest.mock("@react-native-firebase/auth", () => () => ({
  signInWithEmailAndPassword: jest.fn((email: string, password: string) => {}),
  createUserWithEmailAndPassword: jest.fn(
    (email: string, password: string) => {}
  ),
  onAuthStateChanged: jest.fn((user: any) => {}),
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
  };
});
jest.mock("@react-native-firebase/messaging", () => () => {
  return {
    requestPermission: jest.fn(() => true),
  };
});

const navigationRef = createNavigationContainerRef();

describe("<AuthForm/>", () => {
  it("Calls onChangeText on TextInputs", async () => {
    //mocking AuthForm props that are functions
    const onSubmit = jest.fn();

    const credentialsInvalid = {
      email: false,
      password: false,
      fullName: false,
      mobile: false,
    };

    const setCredentialsInvalid = jest.fn();

    // Rendering AuthForm component using react-native-test-renderer.
    const authForm = render(
      <Provider store={store}>
        <NavigationContainer>
          <AuthForm
            isLogin={true}
            isAuthenticating={false}
            onSubmit={onSubmit}
            credentialsInvalid={credentialsInvalid}
            setCredentialsInvalid={setCredentialsInvalid}
          />
        </NavigationContainer>
      </Provider>
    );

    //grabbing input components
    const emailTextInput = authForm.getByTestId("emailI");
    const passwordTextInput = authForm.getByTestId("passwordI");

    fireEvent.changeText(emailTextInput, "test@test.com");
    fireEvent.changeText(passwordTextInput, "8493003859jfkos");

    // Asserting if the value prop of the TextInputs have the test values .
    expect(emailTextInput.props.value).toBe("test@test.com");
    expect(passwordTextInput.props.value).toBe("8493003859jfkos");
  });
});
