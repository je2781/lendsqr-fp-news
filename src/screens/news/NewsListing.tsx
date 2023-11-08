import React, { useEffect, useState } from "react";
import { HStack, Avatar } from "@react-native-material/core";
import newsRepo from "../../repository/news/news-repo";
import crashlytics from "@react-native-firebase/crashlytics";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  View,
} from "react-native";
import NewsItem from "../../components/news/NewsItem";
import { Article } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Colors from "../../constants/Colors";
import authActions from "../../store/auth-slice";

export default function NewsListing() {
  const [articlesArr, setArticlesArr] = useState<Article[]>([]);
  const dispatch = useAppDispatch();

  const newsApiIsInitializing = useAppSelector(
    (state) => state.auth.isInitializing
  );

  useEffect(() => {
    async function retrieveNewsArticles() {
      try {
        crashlytics().log("retrieving articles from news api");
        const articles = await newsRepo.searchNews();
        for (const article of articles) {
          setArticlesArr((prevState) => [
            ...prevState,
            {
              description: article["description"],
              title: article["title"],
              published_date: article["publishedAt"],
              source_name: article["source"]["name"],
              content: article["content"],
              author: article["author"],
              article_url: article["url"],
              image_url: article["urlToImage"],
            },
          ]);
        }
      } catch (err: any) {
        crashlytics().recordError(err);
        Alert.alert(
          "Download failed!",
          "Could not download news articles for your region"
        );
      } finally {
        crashlytics().log("articles retrieved from news api");
        dispatch(
          authActions.setNewsApiInitialization({
            isInitializing: false,
          })
        );
      }
    }

    retrieveNewsArticles();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 8 }}>
      {newsApiIsInitializing ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={Colors.primary500} />
        </View>
      ) : (
        <View style={{ paddingVertical: 16 }}>
          <FlatList
            data={articlesArr}
            renderItem={({ item, index }) => <NewsItem article={item}/>}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
