import {
  View,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import Strings from "../../constants/Strings";
import AuthContent from "../../components/auth/AuthContent";
import authRepo from "../../repository/auth/auth-repo";
import crashlytics from "@react-native-firebase/crashlytics";
import analytics from "@react-native-firebase/analytics";
import perf from "@react-native-firebase/perf";
import React from "react";
import { AppDispatch } from "../../store";
import { useAppDispatch } from "../../store/hooks";

interface registerProps {
  registerAction: (token: string) => (dispatch: AppDispatch) => void;
}

export default function RegistrationScreen({ registerAction }: registerProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useAppDispatch();
  const { height } = useWindowDimensions();

  async function handleRegistration(input: {
    email: string;
    password: string;
  }) {
    //providing context for crash reports
    crashlytics().log("user registering");

    setIsAuthenticating(true);
    try {
      // starting a trace to record time it takes to register user
      const trace = await perf().startTrace("user_registration");

      const [uid, token] = await authRepo.createUser(
        input.email,
        input.password
      );

      //providing context for crash reports
      crashlytics().log("user registered");
      await crashlytics().setUserId(uid);

      // Define trace meta details
      trace.putAttribute("user_id", uid);

      //logging email/password signup event
      await analytics().logEvent("registration", {
        token: token,
        userId: uid,
      });

      // Stop the trace
      await trace.stop();

      //dispatching action to update redux store that user is authenticated
      dispatch(registerAction(token));
    } catch (err: any) {
      crashlytics().recordError(err);
      Alert.alert(
        "Authentication failed!",
        "Could not register your account. Either your credentials are wrong or account already exists"
      );
      setIsAuthenticating(false);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{Strings.HRegisterTitle}</Text>
        <Text style={styles.subTitle}>{Strings.HAuthSubtitle}</Text>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <KeyboardAvoidingView behavior="padding">
              <AuthContent
                onAuthenticate={handleRegistration}
                isAuthenticating={isAuthenticating}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontFamily: "axiforma-w600",
    color: Colors.secondary800,
    fontSize: 32,
    textAlign: "center",
    marginVertical: 8,
  },
  subTitle: {
    fontFamily: "gothamPro-w400",
    color: Colors.secondary400,
    fontSize: 16,
    paddingHorizontal: 6,
    marginBottom: 8,
    marginTop: 12,
    textAlign: "center",
    lineHeight: 24,
  },
});
