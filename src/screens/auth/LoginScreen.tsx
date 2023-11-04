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
import {useDispatch} from 'react-redux';
import authRepo from "../../repository/auth/auth-repo";
import Colors from "../../constants/Colors";
import Strings from "../../constants/Strings";
import AuthContent from "../../components/auth/AuthContent";
import React from "react";
import type { AppDispatch } from "../../store/index";
import { useAppDispatch } from "../../store/hooks";
interface loginProps{
  loginAction: (token: string) => (dispatch: AppDispatch) => void
}

export default function LoginScreen({loginAction}: loginProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useAppDispatch();
  const { height } = useWindowDimensions();

  async function handleLogin(input: { email: string, password: string }) {
    setIsAuthenticating(true);
    try {
      const token = await authRepo.verifyUser(input.email, input.password);
      dispatch(loginAction(token));
    } catch (err) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Either your credentials are wrong or account already exists"
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
