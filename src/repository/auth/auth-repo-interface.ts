export interface AuthRepoImpl {
  createUser: (
    email: string,
    password: string,
  ) => Promise<any>;

  verifyUser: (
    email: string,
    password: string,
  ) => Promise<any>;

}
