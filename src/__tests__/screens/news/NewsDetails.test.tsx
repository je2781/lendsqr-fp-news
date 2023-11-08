import "react-native";
import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { Provider } from "react-redux"; // Updated import
import store from "../../../store/index";
import {
  NavigationContainer,
  StackActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

import NewsDetails from "../../../screens/news/NewsDetails";

const navigationRef = createNavigationContainerRef();

describe("<NewsDetails/>", () => {
  it("navigates to WebView when article url is pressed", async () => {
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

    const navigation = {
      dispatch: jest.fn((stackAction: any) => {}),
    };

    const route = {
      params: {
        article: article,
      },
    };

    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <NewsDetails navigation={navigation} route={route} />
        </NavigationContainer>
      </Provider>
    );

    if (navigationRef.isReady()) {
      const text = getByTestId("articleUrl");

      fireEvent.press(text);
      // Expect navigation action to be dispatched
      expect(navigation.dispatch).toHaveBeenCalledWith(
        StackActions.push("WebView", {
          url: article.article_url,
        })
      );
    }
  });
});
