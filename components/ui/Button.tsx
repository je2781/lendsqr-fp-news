import React from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  color?: string;
  fontSize?: number;
  isTransparent?: boolean;
  buttonBackgroundColor?: string;
  hasLeftExternalIcon?: boolean;
  hasRightExternalIcon?: boolean;
  borderRadius?: number;
  fontWeight?: any;
  paddingHorizontal?: number;
  paddingVertical?: number;
  leftExternalIcon?: JSX.Element;
  rightExternalIcon?: JSX.Element;
  marginLeft?: number;
  marginRight?: number;
}

function Button(props: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: props.buttonBackgroundColor,
          borderColor: props.buttonBackgroundColor,
          borderRadius: props.borderRadius,
          paddingHorizontal: props.paddingHorizontal,
          paddingVertical: props.paddingVertical,
        },
        pressed && styles.pressed,
        props.isTransparent && styles.buttonTransparent,
      ]}
      onPress={props.onPress}
    >
      <View
        style={[
          styles.iconContainer,
          props.hasLeftExternalIcon && props.hasRightExternalIcon
            ? { justifyContent: "space-between" }
            : { justifyContent: "center" },
        ]}
      >
        {props.hasLeftExternalIcon && props.leftExternalIcon}
        <Text
          style={[
            styles.buttonText,
            {
              marginLeft: props.marginLeft,
              color: props.color,
              fontSize: props.fontSize,
              marginRight: props.marginRight,
              fontWeight: props.fontWeight,
            },
          ]}
        >
          {props.children}
        </Text>
        {props.hasRightExternalIcon && props.rightExternalIcon}
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
