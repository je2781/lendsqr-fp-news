import "react-native";
import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { Provider } from "react-redux"; // Updated import
import store from "../../../store/index";
import {
  NavigationContainer,
  StackActions,
  createNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";

import NewsItem from "../../../components/news/NewsItem";

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


const article = {
  description: "description",
  title: "title",
  published_date: "10/10/2023",
  source_name: "name",
  content: "content",
  author: "Mr Ross",
  article_url: "url",
  image_url: "https://urlImage.jpg",
};

const navigationRef = createNavigationContainerRef();

describe("<NewsItem/>", () => {
  it("navigates to NewsDetails when pressed", async () => {
    const navigation = {
      dispatch: jest.fn((stackAction: any) => {

      })
    }
    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <NewsItem article={article} testID="item-3"/>
        </NavigationContainer>
      </Provider>
    );

    if (navigationRef.isReady()) {
      const pressable = getByTestId("item-3");
  
      fireEvent.press(pressable);
      // Expect navigation action to be dispatched
      expect(navigation.dispatch).toHaveBeenCalledWith(
        StackActions.push("NewsDetails", {
          article: article,
        })
      );
    }


  });
  it("Displays one artice", async () => {
    // Rendering NewsItem component using react-native-test-renderer.
    const newsItem = render(
      <Provider store={store}>
        <NavigationContainer>
          <NewsItem article={article} />
        </NavigationContainer>
      </Provider>
    );

    //grabbing Text components
    const newsImage = newsItem.getByTestId("newsImage");
    const title = newsItem.getByTestId("title");
    const time = newsItem.getByTestId("time");
    const desc = newsItem.getByTestId("description");
    const author = newsItem.getByTestId("author");

    // Asserting if the value prop of the TextInputs have the test values .
    expect(newsImage.props.source).toBeTruthy();
    expect(time).toBeTruthy();
    expect(title.props.children).toBe("title");
    expect(desc.props.children).toBe("description");
    expect(author.props.children).toContain("Mr Ross");
  });
});
