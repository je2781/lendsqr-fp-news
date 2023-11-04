import axios from "axios";
import { NewsRepoImpl } from "./news-repo-interface";
import { BASE_NEWS_API } from "../../constants/base-api";

class NewsRepo implements NewsRepoImpl {
  async searchNews() {
    try {
      const response = await axios.get(
        `${BASE_NEWS_API}?country=ng&apiKey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}`
      );
      return response.data.articles;
    } catch (error) {
      throw error;
    }
  }
}

export default new NewsRepo();
