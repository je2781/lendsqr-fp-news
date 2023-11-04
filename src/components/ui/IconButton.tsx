import { Pressable, StyleSheet, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface IconButtonProps {
  onPress?: () => void;
  color?: string;
  icon: any;
  fontSize?: number;
  size?: number;
  externalIcon?: boolean;
  hasExternalIcon?: boolean;
  marginTop?: number;
  marginRight?: number;
}

function IconButton({
  icon,
  color,
  size,
  onPress,
  marginTop,
  marginRight,
  hasExternalIcon,
  externalIcon,
}: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { marginTop: marginTop, marginRight: marginRight },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {!hasExternalIcon && <Ionicons name={icon} color={color} size={size} />}
      {hasExternalIcon && externalIcon}
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
