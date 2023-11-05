import React, { useEffect, useState } from "react";
import { View, Linking, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

interface webViewProps {
  navigation: any;
  route: any;
}

export default function WebBrowserScreen({ navigation, route }: webViewProps) {
  const [webViewUrl, setWebViewUrl] = useState<string>("");
  useEffect(() => {
    async function openUrl() {
      // Open a URL using Linking.openUrl
      await Linking.openURL(`myapp://openWebView?url=${route.params.url}`);
    }

    openUrl();
  }, []);

  useEffect(() => {
    const sub = Linking.addEventListener("url", (event) => {
      const { url } = event;
      if (url.startsWith("myapp://openWebView?url=")) {
        // Extract the URL to display in the WebView
        const webUrl = url.substring("myapp://openWebView?url=".length);

        // Now, you can display the web content in a WebView
        setWebViewUrl(webUrl);
      }
    });

    return () => sub.remove();
  }, []);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true; // Prevent the default behavior
    });

    return () => {
      sub.remove();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: webViewUrl }} // Use a default URL or any initial URL
        javaScriptEnabled={true} // Enable JavaScript (optional)
        domStorageEnabled={true} // Enable local storage (optional)
      />
    </SafeAreaView>
  );
}
