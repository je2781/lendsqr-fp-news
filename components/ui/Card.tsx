import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

interface cardProps {
  children: React.ReactNode;
}

export default function Card({ children }: cardProps) {
  return <View style={styles.inputContainer}>{children}</View>;
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 6,
    marginTop: deviceWidth < 380 ? 20 : 36,
    backgroundColor: Colors.secondary50,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    alignItems: "center",
  },
});
