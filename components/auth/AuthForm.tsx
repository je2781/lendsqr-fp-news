import { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import { useDispatch } from "react-redux";
import Input from "../ui/Input";
import Colors from "../../constants/Colors";
import IconButton from "../ui/IconButton";
import Button from "../ui/Button";
import FlatButton from "../ui/FlatButton";
import Strings from "../../constants/Strings";
import { auth } from "../../firebaseConfig";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { authenticateUser } from "../../store/auth-actions";
import { handleGoogleAuth } from "../../util/helper/helper";
import React from "react";


interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (input: {
    email: string;
    fullName: string;
    password: string;
    mobile: string;
  }) => void;
  isAuthenticating: boolean;
  setCredentialsInvalid: React.Dispatch<React.SetStateAction<any>>;
  credentialsInvalid: any;
}

function AuthForm(props: AuthFormProps) {
  // Configuring Google Sign-In
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID
  });
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [enteredNumber, setEnteredNumber] = useState<string>("");
  const [isRead, setIsRead] = useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    handleGoogleAuth(response!);
  }, [response]);
 
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        //updating redux store with auth token
        dispatch(authenticateUser(idToken) as any);
      }
    });

    return () => unsub();
  }, []);

  function readTermsNConditions() {
    setIsRead(true);
  }

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    props.setCredentialsInvalid({
      email: false,
      fullName: false,
      password: false,
      mobile: false,
    });
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "fullName":
        setEnteredName(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "mobile":
        setEnteredNumber(enteredValue);
        break;
    }
  }

  
  function submitHandler() {
    props.onSubmit({
      email: enteredEmail,
      mobile: enteredNumber,
      password: enteredPassword,
      fullName: enteredName,
    });
  }

  function switchAuthModeHandler() {
    // Todo
    if (props.isLogin) {
      navigation.dispatch(StackActions.replace("Register"));
    } else {
      navigation.dispatch(StackActions.replace("SignIn"));
    }
  }

  return (
    <View>
      {!props.isLogin && (
        <Input
          onUpdateValue={updateInputValueHandler.bind(null, "fullName")}
          value={enteredName}
          isInvalid={props.credentialsInvalid.fullName}
          icon="person-outline"
          placeholder="Full name"
          placeholderColor={Colors.secondary800}
        />
      )}
      <Input
        onUpdateValue={updateInputValueHandler.bind(null, "email")}
        value={enteredEmail}
        keyboardType="email-address"
        icon="mail-outline"
        isInvalid={props.credentialsInvalid.email}
        placeholder="example@gmail.com"
        placeholderColor={Colors.secondary800}
      />
      {!props.isLogin && (
        <Input
          onUpdateValue={updateInputValueHandler.bind(null, "mobile")}
          value={enteredNumber}
          isInvalid={props.credentialsInvalid.mobile}
          icon="person-outline"
          keyboardType="phone-pad"
          placeholder="Mobile number"
          placeholderColor={Colors.secondary800}
        />
      )}

      <Input
        onUpdateValue={updateInputValueHandler.bind(null, "password")}
        secure
        icon="lock-outline"
        hasSuffixIcon
        suffixIcon="eye-slash"
        value={enteredPassword}
        isInvalid={props.credentialsInvalid.password}
        placeholder="*********"
        placeholderColor={Colors.secondary800}
      />
      {!props.isLogin && (
        <View
          style={{
            alignItems: "flex-start",
            marginVertical: 4,
            flexDirection: "row",
          }}
        >
          {isRead ? (
            <IconButton
              icon="checkbox"
              size={14}
              color={Colors.indigo500}
              marginTop={0}
            />
          ) : (
            <IconButton icon="checkbox-outline" size={14} marginTop={0} />
          )}
          <Text>
            <View style={styles.buttonPrefixTextContainer}>
              <Text
                style={[
                  styles.buttonPrefixText,
                  { fontSize: 12, color: Colors.secondary400 },
                ]}
              >
                I accept all the
              </Text>
            </View>
            <FlatButton
              color={Colors.secondary800}
              fontSize={12}
              onPress={readTermsNConditions}
            >
              Terms & Conditions
            </FlatButton>
          </Text>
        </View>
      )}
      {props.isLogin && (
        <View style={{ alignItems: "flex-end", marginBottom: 8, marginTop: 4 }}>
          <FlatButton color={Colors.secondary500} fontSize={14}>
            {Strings.HForgotPassFlatButton}
          </FlatButton>
        </View>
      )}
      <View style={styles.buttons}>
        {props.isLogin ? (
          <>
            {props.isAuthenticating ? (
              <ActivityIndicator size="large" color={Colors.primary500} />
            ) : (
              <Button
                buttonBackgroundColor={Colors.primary500}
                onPress={submitHandler}
                color="white"
                fontSize={14}
                paddingHorizontal={12}
                borderRadius={8}
                paddingVertical={10}
                fontWeight="bold"
              >
                Sign In
              </Button>
            )}
            <View style={styles.alternateContainer}>
              <View style={styles.alternateTextTrailing}>
                <View style={styles.alternateTextTrailingLine}></View>
              </View>
              <Text style={styles.alternateText}>Or Sign in with</Text>
              <View style={styles.alternateTextTrailing}>
                <View style={styles.alternateTextTrailingLine}></View>
              </View>
            </View>
            <Button
              marginLeft={16}
              buttonBackgroundColor="white"
              onPress={() => promptAsync()}
              paddingHorizontal={12}
              paddingVertical={10}
              borderRadius={8}
              hasLeftExternalIcon
              leftExternalIcon={
                <Image
                  source={require("../../assets/images/google_icon.png")}
                />
              }
              fontSize={16}
              color={Colors.secondary500}
            >
              {Strings.HLoginGoogle}
            </Button>
            <View style={{ marginTop: 62, alignItems: "center" }}>
              <Text>
                <View style={styles.buttonPrefixTextContainer}>
                  <Text style={styles.buttonPrefixText}>
                    Don't have an account?
                  </Text>
                </View>
                <FlatButton
                  onPress={switchAuthModeHandler}
                  color={Colors.primary500}
                  fontSize={16}
                >
                  Register
                </FlatButton>
              </Text>
            </View>
          </>
        ) : (
          <>
            {props.isAuthenticating ? (
              <ActivityIndicator size="large" color={Colors.primary500} />
            ) : (
              <Button
                buttonBackgroundColor={Colors.primary500}
                onPress={submitHandler}
                color="white"
                fontSize={14}
                paddingHorizontal={12}
                paddingVertical={10}
                borderRadius={8}
                fontWeight="bold"
              >
                Register
              </Button>
            )}
            <View style={styles.alternateContainer}>
              <View style={styles.alternateTextTrailing}>
                <View style={styles.alternateTextTrailingLine}></View>
              </View>
              <Text style={styles.alternateText}>Or Sign up with</Text>
              <View style={styles.alternateTextTrailing}>
                <View style={styles.alternateTextTrailingLine}></View>
              </View>
            </View>
            <Button
              marginLeft={16}
              buttonBackgroundColor="white"
              onPress={() => promptAsync()}
              hasLeftExternalIcon
              leftExternalIcon={
                <Image
                  source={require("../../assets/images/google_icon.png")}
                />
              }
              fontSize={16}
              color={Colors.secondary500}
              paddingHorizontal={12}
              paddingVertical={10}
              borderRadius={8}
            >
              {Strings.HRegisterGoogle}
            </Button>
            <View style={{ marginTop: 16, alignItems: "center" }}>
              <Text>
                <View style={styles.buttonPrefixTextContainer}>
                  <Text style={styles.buttonPrefixText}>
                    Already have an account?
                  </Text>
                </View>
                <FlatButton
                  onPress={switchAuthModeHandler}
                  color={Colors.primary500}
                  fontSize={16}
                >
                  Sign In
                </FlatButton>
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 8,
  },
  buttonPrefixTextContainer: {
    marginTop: -4,
  },
  buttonPrefixText: {
    color: Colors.secondary500,
    fontFamily: "gothamPro-w400",
    fontSize: 16,
    textAlign: "center",
  },
  alternateContainer: {
    flexDirection: "row",
    marginVertical: 18,
    marginHorizontal: 4,
  },
  alternateText: {
    color: Colors.secondary500,
    fontSize: 15,
    fontFamily: "gothamPro-w400",
    marginHorizontal: 7,
  },
  alternateTextTrailing: {
    justifyContent: "center",
    flex: 1,
  },
  alternateTextTrailingLine: {
    borderColor: Colors.secondary200,
    borderWidth: 1,
  },
});
