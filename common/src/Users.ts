export enum UserType {
  Internal,
  External
}

export interface User {
  id?: any;
  username: string;
  hash: string;
  salt?: string;
  displayName: string;
  type?: UserType;
}

export interface UserApi {
  login: (
    username: string,
    password: string
  ) => Promise<{ token: string; expiry: string }>;
  profile: () => Promise<User>;
}
