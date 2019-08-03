import mongoose from 'mongoose';
import {
  AdoptionRequestStatus,
  IAdoptionRequest,
  IAdoptionRequestDB,
} from 'dc2410-coursework-common';
import Animals from '../animals/animals.model';
import Users from '../users/users.model';

// tslint:disable-next-line:variable-name
export const AdoptionRequestSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    animal: { type: String, required: true },
    status: { type: AdoptionRequestStatus, required: true },
    id: { type: String, required: false, unique: true},
  },
  { strict: 'throw' },
);

AdoptionRequestSchema.pre('save', function (this: IAdoptionRequestModel) {
  this.id = this._id;
});

export interface IAdoptionRequestModel
  extends IAdoptionRequestDB,
    mongoose.Document {}

// tslint:disable-next-line:variable-name
const AdoptionRequestModel = mongoose.model<IAdoptionRequestModel>(
  'AdoptionRequest',
  AdoptionRequestSchema,
);

class AdoptionRequests {
  public static create = (request: IAdoptionRequestDB) =>
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

    const animal = await Animals.get(adoptionRequest.animal);
    if (animal === null) {
      throw new Error(
        `Adoption Request with id: '${id}', does not have a valid animal.`,
      );
    }

    // Update request status.
    adoptionRequest.status = AdoptionRequestStatus.Approved;

    // Update animal with owner.
    animal.adoptedBy = adoptionRequest.user;

    // Update status of all other request of this animal to denied.
    const allRequestsForAnimal = await this.listAllForAnimal(
      adoptionRequest.animal,
    );

    for (const request of allRequestsForAnimal) {
      if (request.id !== id) {
        await this.deny(request.id);
      }
    }

    await adoptionRequest.save();
    await animal.save();

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

  public static async expand(
    request: IAdoptionRequestDB,
  ): Promise<IAdoptionRequest> {
    return {
      id: request.id,
      animal: (await Animals.get(request.animal!))!,
      user: (await Users.get(request.user!))!,
      status: request.status,
    };
  }

  public static expandAll(
    requests: IAdoptionRequestDB[],
  ): Promise<IAdoptionRequest[]> {
    return Promise.all(requests.map(AdoptionRequests.expand));
  }

  public static async expandAllAsync(
    asyncRequests: Promise<IAdoptionRequestDB[]>,
  ): Promise<IAdoptionRequest[]> {
    const requests = await asyncRequests;
    return Promise.all(requests.map(AdoptionRequests.expand));
  }
}

export default AdoptionRequests;
