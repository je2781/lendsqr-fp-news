import React from "react";
import { Image, View, StyleSheet, Text, Linking } from "react-native";
import { Article } from "../../types/types";
import { SafeAreaView } from "react-native-safe-area-context";

interface newsDetailsProps {
  navigation: any;
  route: any;
}

export default function NewsDetails({ navigation, route }: newsDetailsProps) {
  const article: Article = route.params.article;
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
      <View>
        {article.image_url ? (
          <Image
            source={article.image_url}
            alt="Image of article"
            style={{ width: "100%", height: 400, resizeMode: "cover" }}
          />
        ) : (
          <Text style={{textAlign: 'center'}}>{article.title}</Text>
        )}
      </View>
      <View style={{marginVertical: 24}}>
        <Text style={{textAlign: 'center'}}>{article.content ? article.content : "No Content"}</Text>
      </View>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text>source: {article.source_name}</Text>

        <Text>
          For full article visit:{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL(article.article_url)}
          >
            article url
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});
