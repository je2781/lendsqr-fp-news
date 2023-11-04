import { createNativeStackNavigator } from "@react-navigation/native-stack";
import authAction from "../../store/auth-slice";
import Colors from "../../constants/Colors";
import { authenticateUser } from "../../store/auth-action-creators";
import LoginScreen from "../../screens/auth/LoginScreen";
import RegistrationScreen from "../../screens/auth/RegistrationScreen";
import React from "react";
import { useAppSelector } from "../../store/hooks";

const { Navigator, Screen } = createNativeStackNavigator();



export default function AuthStack() {
  const login = useAppSelector((state) => state.auth.login);
  return (
    <Navigator
      initialRouteName={login ? "SignIn" : "Register"}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.secondary50 },
      }}
    >
      <Screen name="Register">
        {(props) => <RegistrationScreen {...props} registerAction={authenticateUser}/>}
      </Screen>
      <Screen name="SignIn">
        {(props) => <LoginScreen {...props} loginAction={authenticateUser}/>}
      </Screen>
    </Navigator>
  );
}
