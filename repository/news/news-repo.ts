import axios from "axios";
import { NewsRepoImpl } from "./news-repo-interface";
import { Alert } from "react-native";


class NewsRepo implements NewsRepoImpl {
  async searchNews(
    options: Record<"method" | "headers" | "url" | "params", any>
  ) {
    try {
      const response = await axios.request(options);
      return response.data.articles;
    } catch (error) {
      Alert.alert( "Download failed!",
      "Could not download news articles for your region");
    }
  }
}

export default new NewsRepo();
