export interface AuthRepoImpl {
  authenticate: (
    mode: string,
    credentials: Record<"email" | "password", any>
  ) => Promise<string>;

  createUser: (
    email: string,
    password: string,
  ) => Promise<string>;

  verifyUser: (
    email: string,
    password: string,
  ) => Promise<string>;

}
