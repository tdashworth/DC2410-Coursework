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

export interface AnimalApi {
  create: (animal: Animal) => Animal;
  get: (id: Animal["id"]) => Animal;
}
