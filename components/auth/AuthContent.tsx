import { useState } from "react";
import { Alert, StyleSheet, View} from "react-native";
import AuthForm from "./AuthForm";
import React from "react";

interface AuthContentProps{
  isLogin?: boolean;
  onAuthenticate: (input: { email: string, password: string }) => void;
  isAuthenticating: boolean;
}

function AuthContent(props: AuthContentProps) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
  });


  function submitHandler(credentials: {email: string ,fullName: string ,password: string, mobile: string}) {
    let { email, fullName, password, mobile} = credentials;

    email = email.trim();
    password = password.trim();
    fullName = fullName.trim();
    mobile = mobile.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const fullNameIsValid = fullName.length > 0;
    const mobileIsValid = mobile.length > 10;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!props.isLogin && (!fullNameIsValid || !mobileIsValid))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        firstName: !fullNameIsValid,
        password: !passwordIsValid,
        lastName: !mobileIsValid,
      });
      return;
    }
    props.onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={props.isLogin!}
        onSubmit={submitHandler}
        isAuthenticating={props.isAuthenticating}
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
  }
});
