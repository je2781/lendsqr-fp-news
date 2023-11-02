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

function IconButton(props: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { marginTop: props.marginTop, marginRight: props.marginRight },
        pressed && styles.pressed,
      ]}
      onPress={props.onPress}
    >
      {!props.hasExternalIcon && <Ionicons name={props.icon} color={props.color} size={props.size} />}
      {props.hasExternalIcon && props.externalIcon}
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
