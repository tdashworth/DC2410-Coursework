import {
  AdoptionRequestStatus,
  IAdoptionRequest,
  IAdoptionRequestDB,
} from 'dc2410-coursework-common';
import mongoose from 'mongoose';
import Animals from '../animals/animals.model';
import Users from '../users/users.model';

export const AdoptionRequestSchema = new mongoose.Schema(
  {
    animal: { type: String, required: true },
    id: { type: String, required: false, unique: true },
    status: { type: AdoptionRequestStatus, required: true },
    user: { type: String, required: true },
  },
  { strict: 'throw' },
);

AdoptionRequestSchema.pre('save', function(this: IAdoptionRequestModel) {
  this.id = this._id;
});

export interface IAdoptionRequestModel
  extends IAdoptionRequestDB,
    mongoose.Document {}

const AdoptionRequestModel = mongoose.model<IAdoptionRequestModel>(
  'AdoptionRequest',
  AdoptionRequestSchema,
);

/**
 * Adoption requests
 *
 * The model for Adoption request which writes to and queries the database.
 */
class AdoptionRequests {
  /**
   * Creates an adoption request
   * @param request an object containing atleast the required data properties.
   * @returns  a copy of the given request after being saved to the database.
   */
  public static create(request: IAdoptionRequestDB) {
    return new AdoptionRequestModel(request).save();
  }

  /**
   * Gets an adoption request
   * @param id the generate id for the request to return.
   * @returns the request if it exists otherwise null.
   */
  public static get(id: any): Promise<IAdoptionRequestModel | null> {
    if (typeof id !== 'string') return Promise.resolve(null);
    return AdoptionRequestModel.findById(id).exec();
  }

  /**
   * Approves an adoption request
   * @param id the generate id for the request to approve.
   * @returns the updated request.
   */
  public static async approve(id: any): Promise<IAdoptionRequestModel | null> {
    // Get and verify the request exists.
    const adoptionRequest = await this.get(id);
    if (adoptionRequest === null) {
      throw new Error(`Adoption Request with id: '${id}', does not exist.`);
    }

    // Get and verify the request has a linked animal .
    const animal = await Animals.get(adoptionRequest.animal);
    if (animal === null) {
      throw new Error(
        `Adoption Request with id: '${id}', does not have a valid animal.`,
      );
    }

    // Update the request's status.
    adoptionRequest.status = AdoptionRequestStatus.Approved;

    // Update animal with owner.
    animal.adoptedBy = adoptionRequest.user;

    // Update status of all other request of this animal to denied.
    const allRequestsForAnimal = await this.listAllForAnimal(animal.id);

    for (const request of allRequestsForAnimal) {
      if (request.id === id) continue;
      await this.deny(request.id);
    }

    await adoptionRequest.save();
    await animal.save();
    return adoptionRequest;
  }

  /**
   * Denys an adoption request
   * @param id the generate id for the request to deny.
   * @returns the updated request.
   */
  public static async deny(id: any): Promise<IAdoptionRequestModel | null> {
    // Get and verify the request exists.
    const adoptionRequest = await this.get(id);
    if (adoptionRequest === null) {
      throw new Error(`Request with id: '${id}', does not exist.`);
    }

    // Update the request's status.
    adoptionRequest.status = AdoptionRequestStatus.Denied;
    return adoptionRequest.save();
  }

  /**
   * Lists all Adoption Requests
   * @returns all requests.
   */
  public static listAll(): Promise<IAdoptionRequestModel[]> {
    return AdoptionRequestModel.find({}).exec();
  }

  /**
   * Lists all Adoption Requests for a given user
   * @param userId id of user to which filter the requests.
   * @returns all requests for the given user.
   */
  public static listAllMine(userId: string): Promise<IAdoptionRequestModel[]> {
    return AdoptionRequestModel.find({ user: userId }).exec();
  }

  /**
   * Lists all Adoption Requests for a given animal
   * @param animalId id of user to which filter the requests.
   * @returns all requests for the given animal.
   */
  public static listAllForAnimal(
    animalId: string,
  ): Promise<IAdoptionRequestModel[]> {
    return AdoptionRequestModel.find({ animal: animalId }).exec();
  }

  /**
   * Deletes an Adoption Request
   * @param id the generate id for the request to delete.
   * @returns
   */
  public static delete(id: any) {
    return AdoptionRequestModel.deleteOne(id).exec();
  }

  /**
   * Deletes all Adoption Requests
   * @returns
   */
  public static deleteAll() {
    return AdoptionRequestModel.deleteMany({}).exec();
  }

  /**
   * Expands an Adoption Request by retrieving and returning the linked animal and user model.
   *
   * @param request to expand.
   * @returns Expanded request.
   */
  public static async expand(
    request: IAdoptionRequestDB,
  ): Promise<IAdoptionRequest> {
    return {
      animal: (await Animals.get(request.animal!))!,
      id: request.id,
      status: request.status,
      user: (await Users.get(request.user!))!,
    };
  }

  /**
   * Expands all Adoption Requests by retrieving and returning the linked animal and user model.
   * Calls AdoptionRequest.expand for each.
   * @param asyncRequests  Promise array of requests to expand.
   * @returns Promise array of expanded requests.
   */
  public static async expandAllAsync(
    asyncRequests: Promise<IAdoptionRequestDB[]>,
  ): Promise<IAdoptionRequest[]> {
    const requests = await asyncRequests;
    return Promise.all(requests.map(AdoptionRequests.expand));
  }
}

export default AdoptionRequests;
