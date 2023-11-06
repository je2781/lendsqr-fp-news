import React, { useEffect, useLayoutEffect, useState } from "react";
import {Linking} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

interface webViewProps {
  navigation: any;
  route: any;
}

export default function WebBrowserScreen({ navigation, route }: webViewProps) {
  const [webViewUrl, setWebViewUrl] = useState<string>("");

  useLayoutEffect(() => {
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


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
      testID="webview"
        source={{ uri: webViewUrl }} // Use a default URL or any initial URL
        javaScriptEnabled={true} // Enable JavaScript (optional)
        domStorageEnabled={true} // Enable local storage (optional)
      />
    </SafeAreaView>
  );
}
