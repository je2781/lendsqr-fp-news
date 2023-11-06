import React from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  color?: string;
  fontSize?: number;
  isTransparent?: boolean;
  buttonBackgroundColor?: string;
  hasLeftExternalIcon?: boolean;
  hasRightExternalIcon?: boolean;
  borderRadius?: number;
  fontWeight?: any;
  testID?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  leftExternalIcon?: JSX.Element;
  rightExternalIcon?: JSX.Element;
  marginLeft?: number;
  marginRight?: number;
}

function Button({
  children,
  onPress,
  color,
  fontSize,
  isTransparent,
  testID,
  buttonBackgroundColor,
  hasLeftExternalIcon,
  hasRightExternalIcon,
  borderRadius,
  fontWeight,
  paddingHorizontal,
  paddingVertical,
  leftExternalIcon,
  rightExternalIcon,
  marginLeft,
  marginRight,
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: buttonBackgroundColor,
          borderColor: buttonBackgroundColor,
          borderRadius: borderRadius,
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
        },
        pressed && styles.pressed,
        isTransparent && styles.buttonTransparent,
      ]}
      testID={testID}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          hasLeftExternalIcon && hasRightExternalIcon
            ? { justifyContent: "space-between" }
            : { justifyContent: "center" },
        ]}
      >
        {hasLeftExternalIcon && leftExternalIcon}
        <Text
          style={[
            styles.buttonText,
            {
              marginLeft: marginLeft,
              color: color,
              fontSize: fontSize,
              marginRight: marginRight,
              fontWeight: fontWeight,
            },
          ]}
        >
          {children}
        </Text>
        {hasRightExternalIcon && rightExternalIcon}
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    // elevation: 2,
    marginVertical: 8,
    borderWidth: 2,
    marginHorizontal: 4,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonTransparent: {
    borderColor: "white",
    borderWidth: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "gothamPro-w400",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
