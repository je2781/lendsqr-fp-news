import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import React from "react";

interface timeProps {
  date: Date;
  backgroundColor: any;
  testID?: string;
}

export default function Time({ date, backgroundColor, testID }: timeProps) {
  return (
    <View style={[styles.rootContainer, { backgroundColor: backgroundColor }]}>
      <Text style={styles.timeTextStyle} testID={testID}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    borderRadius: 15,
    justifyContent: "center",
  },
  timeTextStyle: {
    fontFamily: "gothamPro-w400",
    fontSize: 8,
    lineHeight: 17.24,
    textAlign: "center",
    paddingBottom: 4,
  },
});
