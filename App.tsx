import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
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


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


function Root() {
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useAppDispatch();
  const authToken = useAppSelector((state) => state.auth.authToken); // Removed type annotation

 
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts
        await Font.loadAsync({
          "axiforma": require("./assets/fonts/Axiforma-Regular.ttf"),
          "axiforma-w600": require("./assets/fonts/Axiforma-Bold.ttf"),
          "gothamPro-w400": require("./assets/fonts/GothamPro-Medium.ttf"),
        });

        // Retrieving token and using it for automatic login
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
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
      <NavigationContainer>
        {!!authToken ? <AuthenticatedStack /> : <AuthStack/>}
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
    flex: 1
  },
});
