import "react-native";
import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { Provider } from "react-redux"; // Updated import
import store, { AppDispatch } from "../../../store/index";
import { NavigationContainer } from "@react-navigation/native";

import RegistrationScreen from "../../../screens/auth/RegistrationScreen";

//mocking firebase modules
jest.mock("@react-native-firebase/auth", () => () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));
/**
 * Mocking Async Storage
 */
jest.mock('@react-native-async-storage/async-storage', () => () => ({
  setItem: jest.fn(),

}));
jest.mock("@react-native-firebase/crashlytics", () => () => ({
  log: jest.fn(),
  recordError: jest.fn()
}));
jest.mock("@react-native-google-signin/google-signin", () => {
  return {
    GoogleSignin: {
      configure: jest.fn(),
    },
  };
});
jest.mock("@react-native-firebase/perf", () => () => {
  return {
    startTrace: jest.fn(function (name: string) {
      return {
        putAttribute: jest.fn(),
        stop: jest.fn(),
      };
    }),
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

describe("<RegistrationScreen/>", () => {
  it("Displays AuthContent with TextInputs having user inputs", async () => {
    // Rendering RegistrationScreen component using react-native-test-renderer.
    const registrationScreen = render(
      <Provider store={store}>
        <NavigationContainer>
          <RegistrationScreen registerAction={jest.fn()} />
        </NavigationContainer>
      </Provider>
    );
    //retrieving auth content component
    const authContent = registrationScreen.getByTestId("authcontent");

    // Asserting if that authContent is defined.
    expect(authContent).toBeTruthy();

    //grabbing input components
    const emailTextInput = registrationScreen.getByTestId("emailI");
    const passwordTextInput = registrationScreen.getByTestId("passwordI");

    fireEvent.changeText(emailTextInput, "test@test.com");
    fireEvent.changeText(passwordTextInput, "8493003859jfkos");

    // Asserting if the value prop of the TextInputs have the test values .
    expect(emailTextInput.props.value).toBe("test@test.com");
    expect(passwordTextInput.props.value).toBe("8493003859jfkos");
  });

  // it("Presses SignIn Button", async () => {
  //   const registerAction = jest.fn((token: string)=> {
  //     return (dispatch: AppDispatch) => {

  //     }
  //   });
  //   // Rendering registrationScreen component using react-native-test-renderer.
  //   const registrationScreen = render(
  //     <Provider store={store}>
  //       <NavigationContainer>
  //         <RegistrationScreen registerAction={registerAction} />
  //       </NavigationContainer>
  //     </Provider>
  //   );

  //   //grabbing form components
  //   const emailTextInput = registrationScreen.getByTestId("emailI");
  //   const mobileInput = registrationScreen.getByTestId("mobileI");
  //   const fullNameInput = registrationScreen.getByTestId("fullNameI");
  //   const passwordTextInput = registrationScreen.getByTestId("passwordI");
  //   const button= registrationScreen.getByTestId("registerButton");

  //   act(() => {
  //     fireEvent.changeText(emailTextInput, "test@test.com");
  //     fireEvent.changeText(passwordTextInput, "8493003859jfkos");
  //     fireEvent.changeText(mobileInput, "08055645823");
  //     fireEvent.changeText(fullNameInput, "John Doe");

  //     fireEvent.press(button);
  //   });

  //   expect(registerAction).toContain();

  // });


});
