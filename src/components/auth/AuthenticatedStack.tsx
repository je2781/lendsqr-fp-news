import React, { useEffect } from "react";
import NewsListing from "../../screens/news/NewsListing";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../../constants/Colors";
import NewsDetails from "../../screens/news/NewsDetails";
import { Alert, Button, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser } from "../../store/auth-action-creators";
import crashlytics from "@react-native-firebase/crashlytics";
import analytics from "@react-native-firebase/analytics";
import WebViewScreen from "../../screens/WebViewScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthenticatedStack() {
  const dispatch = useAppDispatch();

  return (
    <Navigator
      initialRouteName="Listing"
      screenOptions={{
        contentStyle: { backgroundColor: Colors.secondary50 },
      }}
    >
      <Screen
        name="Listing"
        component={NewsListing}
        options={{
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row", gap: 30 }}>
                <Button
                  title="Crash"
                  onPress={() => {
                    try {
                      //prviding context for crash reports
                      crashlytics().log("testing crash");
                      throw new Error("app crashed");
                    } catch (err) {
                      Alert.alert("Crash", "App crashed");
                    }
                  }}
                  color={Colors.amber200}
                />
                <TouchableOpacity
                  onPress={() => {
                    //prviding context for crash reports
                    crashlytics().log("user signing out");
                    analytics().logEvent("user_signout", {
                      token: null,
                    });
                    auth()
                      .signOut()
                      .then(() => {
                        dispatch(logoutUser());
                      });
                  }}
                >
                  <MaterialIcons name="logout" size={24} />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Screen name="NewsDetails" component={NewsDetails} />
      <Screen name="WebView" component={WebViewScreen} />
    </Navigator>
  );
}
