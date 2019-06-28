export declare enum UserType {
    Internal = 0,
    External = 1
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
    login: (username: string, password: string) => Promise<{
        token: string;
        expiry: string;
    }>;
    profile: () => Promise<User>;
}
export declare enum AnimalType {
    Cat = 0,
    Dog = 1,
    Bird = 2,
    Pig = 3
}
export declare enum Gender {
    Male = 0,
    Female = 1
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
    get: (id: Animal['id']) => Animal;
}
export declare enum AdoptionRequestStatus {
    Pending = 0,
    Approved = 1,
    Denied = 2
}
export interface AdoptionRequest {
    id?: string;
    user: User;
    animal: Animal;
    status?: AdoptionRequestStatus;
}
