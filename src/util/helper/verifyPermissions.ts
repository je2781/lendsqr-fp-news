import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";
import { Platform } from "react-native";

export async function verifyUserPermission() {
  if (Platform.OS === "ios") {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      return true;
    } else {
      return false;
    }
  } else {
    const authStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    const granted = authStatus === PermissionsAndroid.RESULTS.GRANTED;

    if (granted) {
      return true;
    } else {
      return false;
    }
  }
}
