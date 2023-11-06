/**
 * @format
 */

// Note: import explicitly to use the types shiped with jest.
import { it } from "@jest/globals";

// Note: test renderer must be required after react-native.
import newsRepo from "../../repository/news/news-repo";
//mocking firebase modules
jest.mock("@react-native-firebase/perf", () => () => {
  return {
    newHttpMetric: jest.fn(),
  };
});
jest.mock("@react-native-firebase/remote-config", () => () => {
  return {
    getValue: jest.fn(),
  };
});

describe("News Repo Class", () => {
  it("method should return news articles", async () => {
    newsRepo.searchNews = async (): Promise<any[]> => {
      return [
        {
          description: "description",
          title: "title",
          published_date: "10/10/2023",
          source_name: "name",
          content: "content",
          author: "Mr Ross",
          article_url: "url",
          image_url: "https://urlImage.jpg",
        },
      ];
    };

    const articles = await newsRepo.searchNews();

    expect(articles).toHaveLength(1);
    expect(articles[0]["description"]).toBe("description");
  });
});
