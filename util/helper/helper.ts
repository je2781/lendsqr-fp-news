import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  linkWithCredential,
  signInWithCredential,
} from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleGoogleAuth = async (response: any) => {
  try {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const googleCredential = GoogleAuthProvider.credential(id_token);
      
      //saving token in persistent storage for linking with current user account on signin
      await AsyncStorage.setItem('@token', id_token);
      
      await signInWithCredential(auth, googleCredential);
    }
  } catch (error) {
    Alert.alert("Google Authentication", "Your google credentials failed. Try again later");
  }
};
