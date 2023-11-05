export interface AuthRepoImpl {
  createUser: (
    email: string,
    password: string,
  ) => Promise<string[]>;

  verifyUser: (
    email: string,
    password: string,
  ) => Promise<string[]>;

}
