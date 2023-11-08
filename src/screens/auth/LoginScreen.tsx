import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import authRepo from "../../repository/auth/auth-repo";
import Colors from "../../constants/Colors";
import Strings from "../../constants/Strings";
import AuthContent from "../../components/auth/AuthContent";
import React from "react";
import type { AppDispatch } from "../../store/index";
import { useAppDispatch } from "../../store/hooks";
import crashlytics from "@react-native-firebase/crashlytics";
import analytics from "@react-native-firebase/analytics";
import perf from "@react-native-firebase/perf";
import { verifyUserPermission } from "../../util/helper/verifyPermissions";
interface loginProps {
  loginAction: (token: string) => (dispatch: AppDispatch) => void;
}

export default function LoginScreen({ loginAction }: loginProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { height } = useWindowDimensions();

  async function handleLogin(input: { email: string; password: string }) {
    //setting context for crash report
    crashlytics().log("user signing in");

    setIsAuthenticating(true);
    try {
      //verifying user permissions for push notifications
      const granted = await verifyUserPermission();

      if (granted) {
        // starting a trace to record time it takes to sign user in
        const trace = await perf().startTrace("user_sign_in");

        const [uid, token] = await authRepo.verifyUser(
          input.email,
          input.password
        );

        //setting context for crash report
        crashlytics().log("user signed in");
        await crashlytics().setUserId(uid);

        // Define trace meta details
        trace.putAttribute("user_id", uid);

        //logging email/password signin event
        await analytics().logEvent("user_signed_in", {
          token: token,
          userId: uid,
        });

        // Stop the trace
        await trace.stop();
      } else {
        throw new Error("Notifications Permissions denied");
      }
    } catch (err: any) {
      crashlytics().recordError(err);
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Either account doesn't exists, or app doesn't have the user permissions to proceed"
      );
      setIsAuthenticating(false);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{Strings.HLoginTitle}</Text>
        <Text style={styles.subTitle}>{Strings.HAuthSubtitle}</Text>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <KeyboardAvoidingView behavior="padding">
              <AuthContent
                isLogin={true}
                onAuthenticate={handleLogin}
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
    marginBottom: 8,
    paddingHorizontal: 6,
    marginTop: 12,
    textAlign: "center",
    lineHeight: 24,
  },
});
