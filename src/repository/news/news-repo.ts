import perf  from '@react-native-firebase/perf';
import { NewsRepoImpl } from "./news-repo-interface";
import { BASE_NEWS_API } from "../../constants/base-api";
import remoteConfig from "@react-native-firebase/remote-config";

const newsApiKey = remoteConfig().getValue("news_api_key");

export async function getRequest(url: string) {
  // Define the network metric
  const metric = perf().newHttpMetric(url, 'GET');

  // Start the metric
  await metric.start();

  // Perform a HTTP request and provide response information
  const response = await fetch(url);
  const payload = response.headers.get('Content-Length')!;
  metric.setHttpResponseCode(response.status);
  metric.setResponseContentType(response.headers.get('Content-Type'));
  metric.setResponsePayloadSize(+payload);

  // Stop the metric
  await metric.stop();

  const data: any = await response.json();
  return data.articles;
}
class NewsRepo implements NewsRepoImpl {
  async searchNews() {
    try {
       return getRequest(`${BASE_NEWS_API}?country=ng&apiKey=${newsApiKey.asString() || process.env.EXPO_PUBLIC_NEWS_API_KEY}`);
    } catch (error) {
      throw error;
    }
  }
}

export default new NewsRepo();
