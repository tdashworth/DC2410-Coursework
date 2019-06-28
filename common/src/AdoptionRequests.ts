import { User } from "./Users";
import { Animal } from "./Animals";

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
