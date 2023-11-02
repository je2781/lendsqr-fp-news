import {
  BASE_FIREBASE_AUTH_API,
  BASE_GOOGLE_API,
} from "../../constants/base-api";
import { AuthRepoImpl } from "./auth-repo-interface";
import Config from "react-native-config";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthRepo implements AuthRepoImpl {
  async authenticate(
    mode: string,
    credentials: Record<"email" | "password", string>
  ) {
    const response = await axios.post(
      `${BASE_FIREBASE_AUTH_API}${mode}?key=${Config.FIREBASE_APP_KEY}`,
      {
        email: credentials.email,
        password: credentials.password,
        returnSecureToken: true,
      }
    );

    return response.data.idToken as string;
  }

  async createUser(email: string, password: string) {
    return this.authenticate("signup", { email, password });
  }

  async verifyUser(email: string, password: string) {
    return this.authenticate("signInWithPassword", { email, password });
  }

}

export default new AuthRepo();
