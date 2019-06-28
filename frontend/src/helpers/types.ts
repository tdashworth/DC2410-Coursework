export interface Item {
  name: string;
  value: number;
}

export enum UserType {
  Internal,
  External
}

export interface User {
  username: string;
  hash: string;
  salt?: string;
  displayName: string;
  type?: UserType;
}

export enum AnimalType {
  Cat,
  Dog,
  Bird,
  Pig
}

export enum Gender {
  Male,
  Female
}

export interface Animal {
  id?: any;
  name: string;
  type: AnimalType;
  dob: Date;
  description: string;
  gender: Gender;
  picture?: string;
  adoptedBy?: string;
}

export enum AdoptionRequestStatus {
  Pending,
  Approved,
  Denied
}

export interface AdoptionRequest {
  id?: string;
  user: User;
  animal: Animal;
  status?: AdoptionRequestStatus;
}
