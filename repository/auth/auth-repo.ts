
import { AuthRepoImpl } from "./auth-repo-interface";
import auth from '@react-native-firebase/auth';

class AuthRepo implements AuthRepoImpl {
  
  async createUser(email: string, password: string) {
    const userCred = await auth().createUserWithEmailAndPassword(email, password);

    const token = await userCred.user.getIdToken();

    return token;
  }

  async verifyUser(email: string, password: string) {
    const userCred = await auth().signInWithEmailAndPassword(email, password);

    const token = await userCred.user.getIdToken();

    return token;
  }

}

export default new AuthRepo();
