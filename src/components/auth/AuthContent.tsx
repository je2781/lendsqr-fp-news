import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import AuthForm from "./AuthForm";
import React from "react";
import crashlytics from '@react-native-firebase/crashlytics';

interface AuthContentProps {
  isLogin?: boolean;
  onAuthenticate: (input: { email: string; password: string }) => void;
  isAuthenticating: boolean;
}

function AuthContent({isLogin, onAuthenticate, isAuthenticating}: AuthContentProps) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    fullName: false,
    mobile: false,
  });

  function submitHandler(credentials: {
    email: string;
    fullName: string;
    password: string;
    mobile: string;
  }) {
    crashlytics().log('submitting user data for email/password authentication');
    let { email, fullName, password, mobile } = credentials;

    email = email.trim();
    password = password.trim();
    fullName = fullName.trim();
    mobile = mobile.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const fullNameIsValid = fullName.length > 0;
    const mobileIsValid = mobile.length > 10;

    if (!emailIsValid) {
      Alert.alert("Invalid input", "Please check that you have a valid email");
      setCredentialsInvalid((prevState) => ({
        ...prevState,
        email: !emailIsValid,
      }));
      return;
    }
    if (!passwordIsValid) {
      Alert.alert(
        "Invalid input",
        "Password has to be greater than 6 characters"
      );
      setCredentialsInvalid((prevState) => ({
        ...prevState,
        password: !passwordIsValid,
      }));
      return;
    }
    if (!isLogin && !fullNameIsValid) {
      Alert.alert("Invalid input", "Please provide your full name");
      setCredentialsInvalid((prevState) => ({
        ...prevState,
        fullName: !fullNameIsValid,
      }));
      return;
    }
    if (!isLogin && !mobileIsValid) {
      Alert.alert("Invalid input", "Please provide a valid mobile number");
      setCredentialsInvalid((prevState) => ({
        ...prevState,
        mobile: !mobileIsValid,
      }));
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent} testID='authcontent'>
      <AuthForm
        isLogin={isLogin!}
        onSubmit={submitHandler}
        isAuthenticating={isAuthenticating}
        credentialsInvalid={credentialsInvalid}
        setCredentialsInvalid={setCredentialsInvalid}
      />
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 2,
  },
});
