export enum UserType {
  Internal = 0,
  External = 1,
}
export interface IUser {
  id?: any;
  username: string;
  passwordHash: string;
  salt?: string;
  displayName: string;
  type?: UserType;
}
export interface IUserApi {
  login: (
    username: string,
    password: string,
  ) => Promise<IAuthResponse>;
  profile: () => Promise<IUser>;
  register: (user: IUser) => Promise<IUser>;
}
export enum AnimalType {
  Cat = 0,
  Dog = 1,
  Bird = 2,
  Pig = 3,
}
export enum Gender {
  Male = 0,
  Female = 1,
}
export interface IAnimal {
  id?: any;
  name: string;
  type: AnimalType;
  dob: Date;
  description: string;
  gender: Gender;
  picture?: string;
  adoptedBy?: string;
}
export interface IAnimalApi {
  create: (animal: IAnimal) => Promise<IAnimal>;
  get: (id: IAnimal['id']) => Promise<IAnimal>;
  update: (id: IAnimal['id'], animal: {}) => Promise<IAnimal>;
  listAll: () => Promise<IAnimal[]>;
}
export enum AdoptionRequestStatus {
  Pending = 0,
  Approved = 1,
  Denied = 2,
}
export interface IAdoptionRequestDB {
  id?: any;
  user: IUser['id'];
  animal: IAnimal['id'];
  status: AdoptionRequestStatus;
}
export interface IAdoptionRequest {
  id?: any;
  user: IUser;
  animal: IAnimal;
  status: AdoptionRequestStatus;
}

export interface IAdoptionRequestApi {
  create: (request: IAdoptionRequest) => Promise<IAdoptionRequest>;
  approve: (id: IAdoptionRequest['id']) => Promise<IAdoptionRequest | null>;
  deny: (id: IAdoptionRequest['id']) => Promise<IAdoptionRequest | null>;
  listAll: () => Promise<IAdoptionRequest[]>;
  forAnimal: (id: IAnimal['id']) => Promise<IAdoptionRequest[]>;
}

export interface IAuthToken {
  id: any;
  username: string;
  exp: number;
}

export interface IAuthResponse {
  token: string;
  expiry: Date;
  user: IUser;
}
