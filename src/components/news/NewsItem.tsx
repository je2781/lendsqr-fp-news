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
import crashlytics from "@react-native-firebase/crashlytics";
import analytics from "@react-native-firebase/analytics";
interface NewsItemProps {
  article: Article;
  testID?: string;
}

export default function NewsItem({ article, testID }: NewsItemProps) {
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
          testID={testID}
          style={({ pressed }) => pressed && styles.pressed}
          onPress={async () => {
            crashlytics().log(
              "user pushing newsdetails screen onto newslisting screen"
            );

            analytics().logEvent("newsdetails_screen_active");

            navigation.dispatch(
              StackActions.push("NewsDetails", {
                article: article,
              })
            );
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <View style={{ maxWidth: width < 460 ? "79.5%" : "85%" }}>
                <Text style={styles.title} testID="title">
                  {article.title}
                </Text>
                <Text style={styles.description} testID="description">
                  {article.description}
                </Text>
              </View>
              <View style={styles.footer}>
                <Time
                  date={new Date(article.published_date)}
                  backgroundColor={Colors.primary500}
                  testID="time"
                />
                <Text style={styles.author} testID="author">
                  Author: {article.author}
                </Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/breaking-news.png")}
                resizeMode="contain"
                style={styles.foregroundImg}
                testID="newsImage"
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
    textAlign: "left",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
