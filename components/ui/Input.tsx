import { View, Text, TextInput, StyleSheet } from "react-native";
import {MaterialIcons, FontAwesome} from "@expo/vector-icons";
import { useState } from "react";
import Colors from "../../constants/Colors";

interface InputProps{
  hasSuffixIcon?: boolean,
  placeholder?: string,
  secure?: boolean,
  icon?: any,
  suffixIcon?: any,
  keyboardType?: any,
  placeholderColor?: any,
  value: string,
  isInvalid?: boolean,
  onUpdateValue: (value: string) => void
}

function Input(props: InputProps ) {
  const [isSecure, setIsSecure] = useState(true);
  return (
    <View style={styles.inputContainer}>
      <View
        style={[styles.prefixIconContainer, props.isInvalid && styles.inputInvalid]}
      >
        <MaterialIcons name={props.icon} size={19} color={Colors.secondary800} />
      </View>
      <TextInput
        style={[
          styles.input,
          props.isInvalid && styles.inputInvalid,
          !props.hasSuffixIcon && {
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          },
        ]}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={props.keyboardType}
        secureTextEntry={isSecure ? props.secure : undefined}
        onChangeText={props.onUpdateValue}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderColor}
        // onSubmitEditing={submitData}
      />
      {props.hasSuffixIcon && (
        <View
          style={[styles.suffixIconContainer, props.isInvalid && styles.inputInvalid]}
        >
          <FontAwesome
            name={props.suffixIcon}
            size={19}
            color={Colors.secondary800}
            onPress={() => setIsSecure((currentValue) => !currentValue)}
          />
        </View>
      )}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 11,
    paddingRight: 8,
    paddingLeft: 0,
    backgroundColor: "white",
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
  prefixIconContainer: {
    padding: 15,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  suffixIconContainer: {
    padding: 15,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
});
