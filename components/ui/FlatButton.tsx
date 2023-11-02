import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface flatButtonProps{
  children: React.ReactNode,
  onPress?: () => void,
  color?: string,
  fontSize?: number,
}

function FlatButton(props: flatButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={props.onPress}
    >
      <View>
        <Text style={[styles.buttonText, {color: props.color, fontSize: props.fontSize}]}>{props.children}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingLeft: 6,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'gothamPro-w400'
  },
});
