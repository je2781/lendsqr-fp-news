import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux"; // Updated import
import store from "../../../store/index";
import { NavigationContainer } from "@react-navigation/native";

import Time from "../../../components/news/Time";

//mocking firebase modules
jest.mock("@react-native-async-storage/async-storage", () => () => ({
  setItem: jest.fn(),
}));
jest.mock("@react-native-firebase/crashlytics", () => () => ({
  log: jest.fn(),
}));

jest.mock("@react-native-firebase/analytics", () => () => ({
  logEvent: jest.fn(),
}));

describe("<Time/>", () => {
  it("Displays the published date of one article", async () => {
    //mocking Time props that are functions
    const testID = 'time';
    const backgroundColor = 'white';
    const date = new Date('11/6/2023');

    // Rendering Time component using react-native-test-renderer.
    const time = render(
      <Provider store={store}>
        <NavigationContainer>
          <Time testID={testID} backgroundColor={backgroundColor} date={date}/>
        </NavigationContainer>
      </Provider>
    );

    //grabbing Time component
    const timeComponent = time.getByTestId("time");

    // Asserting if the value prop of the TextInputs have the test values .
    expect(timeComponent.props.children).toContain('6/11/2023');
  });
});
