import React, { useState, useEffect, useCallback, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  StackActions,
  useNavigation,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { StyleSheet, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux"; // Updated import
import AuthStack from "./components/auth/AuthStack";
import { authenticateUser } from "./store/auth-action-creators";
import AuthenticatedStack from "./components/auth/AuthenticatedStack";
import store from "./store/index";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import codePush from "react-native-code-push";
import crashlytics from "@react-native-firebase/crashlytics";
import analytics from "@react-native-firebase/analytics";
import remoteConfig from "@react-native-firebase/remote-config";
import { verifyUserPermission } from "./util/helper/verifyPermissions";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function Root() {
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useAppDispatch();
  const authToken = useAppSelector((state) => state.auth.authToken);
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>("");

  useEffect(() => {
    async function prepare() {
      crashlytics().log("App mounted.");
      try {
        // Pre-load fonts
        await Font.loadAsync({
          axiforma: require("./assets/fonts/Axiforma-Regular.ttf"),
          "axiforma-w600": require("./assets/fonts/Axiforma-Bold.ttf"),
          "gothamPro-w400": require("./assets/fonts/GothamPro-Medium.ttf"),
        });

        //setting default values for env variables if fetch from firebase backend  fails
        remoteConfig()
          .setDefaults({
            'web_client_id': process.env.EXPO_PUBLIC_WEB_CLIENT_ID!,
            'news_api_key': process.env.EXPO_PUBLIC_NEWS_API_KEY!,
          })
          .then(() => remoteConfig().fetchAndActivate())
          .then((fetchedRemotely) => {
            if (fetchedRemotely) {
              console.log(
                "Configs were retrieved from the backend and activated."
              );
            } else {
              console.log(
                "No configs were fetched from the backend, and the local configs were already activated"
              );
            }
          });
        // Retrieving token and using it for automatic login
        const storedToken = await AsyncStorage.getItem("token");
        //verifying user permissions for push notifications
        const granted = await verifyUserPermission();
        if (storedToken && granted) {
          dispatch(authenticateUser(storedToken));
        }
      } catch (error) {
        console.warn(error);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.rootContainer} onLayout={onLayoutRootView}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.getCurrentRoute()!.name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.getCurrentRoute()!.name;
          const trackScreenView = async (routeName: string) => {
            //logging user screen changes
            await analytics().logScreenView({
              screen_name: routeName,
              screen_class: routeName,
            });
          };

          if (previousRouteName !== currentRouteName) {
            // Save the current route name for later comparison
            routeNameRef.current = currentRouteName;

            await trackScreenView(currentRouteName);
          }
        }}
      >
        {!!authToken ? <AuthenticatedStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

function App() {
  return (
    <>
      <Provider store={store}>
        <Root />
      </Provider>
      <StatusBar style="auto" />
    </>
  );
}

export default codePush(App);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
