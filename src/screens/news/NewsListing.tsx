import React, { useEffect, useState } from "react";
import { HStack, Avatar } from "@react-native-material/core";
import newsRepo from "../../repository/news/news-repo";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  View,
} from "react-native";
import NewsItem from "../../components/news/NewsItem";
import { Article } from "../../types/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Colors from "../../constants/Colors";
import authActions from '../../store/auth-slice';

export default function NewsListing() {
  const [articlesArr, setArticlesArr] = useState<Article[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function retrieveNewsArticles() {
      try {
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
      } catch (err) {
        Alert.alert(
          "Download failed!",
          "Could not download news articles for your region"
        );
        dispatch(authActions.setFirebaseInitialization({
          isInitializing: false
        }));
      }
    }

    retrieveNewsArticles();
  }, []);

  const firebaseIsInitializing = useAppSelector(
    (state) => state.auth.isInitializing
  );
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 16 }}
    >
      {firebaseIsInitializing ? (
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
        <FlatList
          data={articlesArr}
          renderItem={({ item }) => <NewsItem article={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
}
