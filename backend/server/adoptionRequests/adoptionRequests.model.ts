import { Schema, Model, Document, model } from 'mongoose';
import {
  AdoptionRequestStatus,
  IAdoptionRequestApi,
  IAdoptionRequest,
} from 'dc2410-coursework-common';

// tslint:disable-next-line:variable-name
export const AdoptionRequestSchema = new Schema(
  {
    user: { type: String, required: true },
    animal: { type: String, required: true },
    status: { type: AdoptionRequestStatus, required: true },
  },
  { strict: 'throw' },
);

export interface IAdoptionRequestModel extends IAdoptionRequest, Document {}

// tslint:disable-next-line:variable-name
const AdoptionRequestModel = model<IAdoptionRequestModel>(
  'AdoptionRequest',
  AdoptionRequestSchema,
);

class AdoptionRequests {
  public static create = (request: IAdoptionRequest) =>
    new AdoptionRequestModel(request).save()

  public static get(id: any): Promise<IAdoptionRequestModel | null> {
    if (typeof id !== 'string') return Promise.resolve(null);
    return AdoptionRequestModel.findById(id).exec();
  }

  public static async approve(id: any): Promise<IAdoptionRequestModel | null> {
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

  public static async deny(id: any): Promise<IAdoptionRequestModel | null> {
    const adoptionRequest = await this.get(id);

    if (adoptionRequest === null) {
      throw new Error(`Request with id: '${id}', does not exist.`);
    }

    adoptionRequest.status = AdoptionRequestStatus.Denied;
    return adoptionRequest.save();
  }

  public static listAll(): Promise<IAdoptionRequestModel[]> {
    return AdoptionRequestModel.find({}).exec();
  }

  public static listAllMine(userId: string): Promise<IAdoptionRequestModel[]> {
    return AdoptionRequestModel.find({ user: userId }).exec();
  }

  public static listAllForAnimal(
    animalId: string,
  ): Promise<IAdoptionRequestModel[]> {
    return AdoptionRequestModel.find({ animal: animalId }).exec();
  }

  public static delete(id: any) {
    return AdoptionRequestModel.deleteOne(id).exec();
  }

  public static deleteAll() {
    return AdoptionRequestModel.deleteMany({}).exec();
  }
}

export default AdoptionRequests;
