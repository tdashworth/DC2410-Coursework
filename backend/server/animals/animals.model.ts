import { AnimalType, Gender, IAnimal } from 'dc2410-coursework-common';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';

export interface IAnimalModel extends IAnimal, mongoose.Document {}

export const AnimalSchema = new mongoose.Schema(
  {
    adoptedBy: { type: String, required: false },
    description: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: Gender, required: true },
    id: { type: String, required: false, unique: true },
    name: { type: String, required: true },
    pictures: { type: [String] },
    type: { type: AnimalType, required: true },
  },
  { strict: 'throw' },
);

AnimalSchema.pre('save', async function(this: IAnimalModel) {
  this.name = sanitizeHtml(this.name);
  this.description = sanitizeHtml(this.description);
  this.id = this._id;
});

const Animal = mongoose.model<IAnimalModel>('animals', AnimalSchema);

export default class Animals {
  /**
   * Creates an animal
   * @param newAnimal an object containing atleast the required data properties.
   * @returns a copy of the given animal after being saved to the database.
   */
  public static create(newAnimal: IAnimal): Promise<IAnimalModel> {
    return new Animal(newAnimal).save();
  }

  /**
   * Gets an animal
   * @param id the generate id for the animal to return.
   * @returns the animal if it exists otherwise null.
   */
  public static get(id: string): Promise<IAnimalModel | null> {
    if (!(typeof id === 'string')) return Promise.resolve(null);
    return Animal.findById(id).exec();
  }

  /**
   * Lists all animals
   * @returns all animals
   */
  public static listAll(): Promise<IAnimalModel[]> {
    return Animal.find({}).exec();
  }

  /**
   * Lists all available animals
   * @returns all available animals
   */
  public static listAllAvailable(): Promise<IAnimalModel[]> {
    return Animal.find({ adoptedBy: null }).exec();
  }

  /**
   * Updates an animal
   * @param id the generate id for the animal to update and return.
   * @param updatedAnimal an object of properties to update.
   * @returns the updated animals if it exist otherwise null.
   */
  public static async update(id: any, updatedAnimal: any): Promise<IAnimalModel | null> {
    if (!(typeof id === 'string')) return Promise.resolve(null);
    return Animal.findByIdAndUpdate(id, updatedAnimal).exec();
  }

  /**
   * Adds an image to an animal
   * @param id the generate id for the animal to update and return.
   * @param imageLocation the location of the image to store.
   * @returns the updated animal. 
   */
  public static async addImage(id: any, imageLocation: string) {
    if (!(typeof id === 'string')) return Promise.resolve(null);
    const orginal = await this.get(id);
    if (orginal == null) {
      throw new Error(`Animal with id ${id} could not be found.`);
    }

    orginal.pictures!.push(imageLocation);
    return orginal.save();
  }

  /**
   * Deletes an animal
   * @param id the generate id for the animal to delete.
   * @returns
   */
  public static delete(id: any) {
    return Animal.findByIdAndDelete(id).exec();
  }

  /**
   * Deletes all animals.
   * @returns
   */
  public static deleteAll() {
    return Animal.deleteMany({}).exec();
  }
}
