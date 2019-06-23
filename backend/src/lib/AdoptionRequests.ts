import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export enum AdoptionRequestStatus {
  Pending,
  Approved,
  Denied,
}

export interface IAdoptionRequest {
  user: string;
  animal: string;
  status?: AdoptionRequestStatus;
}

// tslint:disable-next-line:variable-name
export const AdoptionRequestSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    animal: { type: String, required: true },
    status: { type: AdoptionRequestStatus, required: false },
  },
  { strict: 'throw' },
);

export interface IAdoptionRequestModel
  extends IAdoptionRequest,
    mongoose.Document {}

AdoptionRequestSchema.pre('save', async function (this: IAdoptionRequestModel) {
  this.status = this.status || AdoptionRequestStatus.Pending;
});

// tslint:disable-next-line:variable-name
let AdoptionRequest: mongoose.Model<IAdoptionRequestModel, {}>;
AdoptionRequest = mongoose.model<IAdoptionRequestModel>(
  'AdoptionRequest',
  AdoptionRequestSchema,
);

export default class AdoptionRequests {
  static create(newAdoptionRequest: IAdoptionRequest): Promise<IAdoptionRequestModel> {
    return new AdoptionRequest(newAdoptionRequest).save();
  }

  static get(id: any): Promise<IAdoptionRequestModel | null> {
    if (!(id instanceof ObjectId)) return Promise.resolve(null);
    return AdoptionRequest.findById(id).exec();
  }

  static async approve(id: any): Promise<IAdoptionRequestModel | null> {
    const adoptionRequest = await this.get(id);

    if (adoptionRequest === null) {
      throw new Error(`Adoption Request with id: '${id}', does not exist.`);
    }

    adoptionRequest.status = AdoptionRequestStatus.Approved;
    await adoptionRequest.save();

    const allRequestsForAnimal = await this.listAllForAnimal(
      adoptionRequest.animal,
    );

    for (const request of allRequestsForAnimal) {
      if (!request._id.equals(id)) {
        await this.deny(request._id);
      }
    }

    return adoptionRequest;
  }

  static async deny(id: any): Promise<IAdoptionRequestModel | null> {
    const adoptionRequest = await this.get(id);

    if (adoptionRequest === null) {
      throw new Error(`Request with id: '${id}', does not exist.`);
    }

    adoptionRequest.status = AdoptionRequestStatus.Denied;
    return adoptionRequest.save();
  }

  static listAll(): Promise<IAdoptionRequestModel[]> {
    return AdoptionRequest.find({}).exec();
  }

  static listAllForUser(userId: string): Promise<IAdoptionRequestModel[]> {
    return AdoptionRequest.find({ user: userId }).exec();
  }

  static listAllForAnimal(animalId: string): Promise<IAdoptionRequestModel[]> {
    return AdoptionRequest.find({ animal: animalId }).exec();
  }

  static delete(id: any) {
    return AdoptionRequest.findByIdAndDelete(id).exec();
  }

  static deleteAll() {
    return AdoptionRequest.deleteMany({}).exec();
  }

  static disconnect() {
    return mongoose.disconnect();
  }
}
