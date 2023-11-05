import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import Input from "../ui/Input";
import Colors from "../../constants/Colors";
import IconButton from "../ui/IconButton";
import Button from "../ui/Button";
import FlatButton from "../ui/FlatButton";
import Strings from "../../constants/Strings";
import { authenticateUser } from "../../store/auth-action-creators";
import authActions from "../../store/auth-slice";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import remoteConfig from '@react-native-firebase/remote-config';

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

function AuthForm({
  isLogin,
  onSubmit,
  isAuthenticating,
  setCredentialsInvalid,
  credentialsInvalid,
}: AuthFormProps) {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [enteredNumber, setEnteredNumber] = useState<string>("");
  const [isRead, setIsRead] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const emailRef = useRef<TextInput>(null);
  const passRef = useRef<TextInput>(null);
  const mobileRef = useRef<TextInput>(null);
  const webClientId = remoteConfig().getValue('web_client_id');

  //configuring google signin
  GoogleSignin.configure({
    webClientId: webClientId.asString(),
  });

  async function onGoogleButtonPress() {
    crashlytics().log('user using google sign in');
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken, user } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);
    //logging google signin event
    return analytics().logEvent("google_signed_in", {
      googleIdToken: idToken,
      userId: user.id,
    });
  }

  useEffect(() => {
    crashlytics().log('auth listener for user auth changes defined');
    const subscriber = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        dispatch(authenticateUser(token));
      }
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  function readTermsNConditions() {
    setIsRead(true);
  }

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    crashlytics().log('handling changeText of TextInput');
    setCredentialsInvalid({
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
    onSubmit({
      email: enteredEmail,
      mobile: enteredNumber,
      password: enteredPassword,
      fullName: enteredName,
    });
  }

  function switchAuthModeHandler() {
    // Todo
    if (isLogin) {
      navigation.dispatch(StackActions.replace("Register"));
    } else {
      navigation.dispatch(StackActions.replace("SignIn"));
    }
  }

  return (
    <View>
      {!isLogin && (
        <Input
          onUpdateValue={updateInputValueHandler.bind(null, "fullName")}
          value={enteredName}
          blurOnSubmit={false}
          onSubmitEditing={() => emailRef.current?.focus()}
          isInvalid={credentialsInvalid.fullName}
          returnKeyType={"next"}
          icon="person-outline"
          placeholder="Full name"
          placeholderColor={Colors.secondary800}
        />
      )}
      <Input
        onUpdateValue={updateInputValueHandler.bind(null, "email")}
        ref={emailRef}
        value={enteredEmail}
        blurOnSubmit={false}
        keyboardType="email-address"
        onSubmitEditing={() => mobileRef.current?.focus()}
        icon="mail-outline"
        isInvalid={credentialsInvalid.email}
        returnKeyType={"next"}
        placeholder="example@gmail.com"
        placeholderColor={Colors.secondary800}
      />
      {!isLogin && (
        <Input
          onUpdateValue={updateInputValueHandler.bind(null, "mobile")}
          value={enteredNumber}
          onSubmitEditing={() => passRef.current?.focus()}
          ref={mobileRef}
          blurOnSubmit={false}
          isInvalid={credentialsInvalid.mobile}
          icon="person-outline"
          returnKeyType={"next"}
          keyboardType="phone-pad"
          placeholder="Mobile number"
          placeholderColor={Colors.secondary800}
        />
      )}

      <Input
        onUpdateValue={updateInputValueHandler.bind(null, "password")}
        secure
        icon="lock-outline"
        ref={passRef}
        hasSuffixIcon
        suffixIcon="eye-slash"
        returnKeyType={"done"}
        value={enteredPassword}
        isInvalid={credentialsInvalid.password}
        onSubmitEditing={submitHandler}
        placeholder="*********"
        placeholderColor={Colors.secondary800}
      />
      {!isLogin && (
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
      {isLogin && (
        <View style={{ alignItems: "flex-end", marginBottom: 8, marginTop: 4 }}>
          <FlatButton color={Colors.secondary500} fontSize={14}>
            {Strings.HForgotPassFlatButton}
          </FlatButton>
        </View>
      )}
      <View style={styles.buttons}>
        {isLogin ? (
          <>
            {isAuthenticating ? (
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
              onPress={() =>
                onGoogleButtonPress()
                  .then(() => console.log("Signed in with Google!"))
              }
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
            {isAuthenticating ? (
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
              onPress={() =>
                onGoogleButtonPress()
                  .then(() => console.log("Signed in with Google!"))
              }
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
