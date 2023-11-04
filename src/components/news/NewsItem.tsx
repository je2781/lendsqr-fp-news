import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { HStack, Avatar } from "@react-native-material/core";
import { StackActions, useNavigation } from "@react-navigation/native";
import React from "react";
import type { Article } from "../../types/types";
import Colors from "../../constants/Colors";
import Time from "./Time";
import Card from "../ui/Card";

interface NewsItemProps {
  article: Article;
}

export default function NewsItem({ article }: NewsItemProps) {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        flexDirection: width < 460 ? undefined : "row",
        justifyContent: width < 460 ? undefined : "center",
      }}
    >
      <Card>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={() => {
            navigation.dispatch(
              StackActions.push("NewsDetails", {
                article: article,
              })
            );
          }}
        >
          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={{maxWidth: width < 460 ? '79.5%' : '85%'}}>
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.description}>{article.description}</Text>
              </View>
              <View style={styles.footer}>
                <Time
                  date={new Date(article.published_date)}
                  backgroundColor={Colors.amber200}
                />
                <Text style={styles.author}>Author: {article.author}</Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/breaking-news.png")}
                resizeMode="contain"
                style={styles.foregroundImg}
              />
            </View>
          </View>
        </Pressable>
      </Card>
    </View>
  );
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  title: {
    fontFamily: "axiforma-w600",
    fontSize: 10,
    // color: Colors.secondary800,
  },
  pressed: {
    opacity: 0.7,
  },
  description: {
    fontFamily: "gothamPro-w400",
    fontSize: 10,
    color: Colors.secondary500,
    marginVertical: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    fontSize: 8,
    marginTop: 8,
  },
  author: {
    fontSize: 10,
  },
  time: {
    fontSize: 8,
  },
  foregroundImg: {
    width: 80,
    height: 80,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
