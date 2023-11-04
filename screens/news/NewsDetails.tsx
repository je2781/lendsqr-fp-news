import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Article } from "../../types/types";

interface newsDetailsProps{
    navigation: any;
    route: any
}

export default function NewsDetails({navigation, route}: newsDetailsProps) {
    const article: Article = route.params;
  return (
    <View style={styles.rootContainer}>
      <Image source={article.image_url} alt="Image of article" />
    </View>
  );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    }
});
