/**
 * @format
 */

// Note: import explicitly to use the types shiped with jest.
import { it } from "@jest/globals";

import authRepo from "../../repository/auth/auth-repo";
//mocking firebase auth module
jest.mock("@react-native-firebase/auth", () => () => ({
  signInWithEmailAndPassword: jest.fn((email: string, password: string) => {
    return {
      user: {
        getIdToken: jest.fn(() => {
          return "wjfoowkl-diow_rfgfa";
        }),
        uid: "23567225"
      }
    };
}),
  createUserWithEmailAndPassword: jest.fn((email: string, password: string) => {
      return {
        user: {
          getIdToken: jest.fn(() => {
            return "wjfoowkl-diow_23osp";
          }),
          uid: "235672"
        }
      };
  }),
}));

describe("Auth Repo Class", () => {
  it("methods should return selected user credentials", async () => {
    const [userId, token] = await authRepo.createUser("test@test.com", "3728");
    const [userId2, token2] = await authRepo.verifyUser(
      "test@test.com",
      "3728"
    );

    expect(userId).toBe('235672');
    expect(userId2).toBe('23567225');
    expect(token).toBe('wjfoowkl-diow_23osp');
    expect(token2).toBe('wjfoowkl-diow_rfgfa');
  });
});
