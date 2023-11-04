import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

interface cardProps {
  children: React.ReactNode;
}

export default function Card({ children }: cardProps) {
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        styles.inputContainer,
        {
          maxWidth: width < 460 ? "100%" : "68%",
          marginBottom: width < 460 ? 20 : 36,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 6,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    alignItems: "center",
  },
});
