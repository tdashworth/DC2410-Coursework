import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import { IAnimal, AnimalType, Gender } from 'dc2410-coursework-common';

export interface IAnimalModel extends IAnimal, mongoose.Document {}

// tslint:disable-next-line:variable-name
export const AnimalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: AnimalType, required: true },
    dob: { type: Date, required: true },
    description: { type: String, required: true },
    gender: { type: Gender, required: true },
    pictures: { type: [String] },
    adoptedBy: { type: String, required: false },
    id: { type: String, required: false },
  },
  { strict: 'throw' },
);

AnimalSchema.pre('save', async function(this: IAnimalModel) {
  this.name = sanitizeHtml(this.name);
  this.description = sanitizeHtml(this.description);
  this.id = this._id;
});

// tslint:disable-next-line:variable-name
const Animal = mongoose.model<IAnimalModel>('animals', AnimalSchema);

export default class Animals {
  public static create(newAnimal: IAnimal): Promise<IAnimalModel> {
    return new Animal(newAnimal).save();
  }

  public static get(id: string): Promise<IAnimalModel | null> {
    if (!(typeof id === 'string')) return Promise.resolve(null);
    return Animal.findById(id).exec();
  }

  public static listAll(): Promise<IAnimalModel[]> {
    return Animal.find({}).exec();
  }

  public static listAllAvailable(): Promise<IAnimalModel[]> {
    return Animal.find({ adoptedBy: null }).exec();
  }

  public static async update(id: any, updatedAnimal: any) {
    if (!(typeof id === 'string')) return Promise.resolve(null);
    const orginal = await this.get(id);
    if (orginal !== null && orginal.adoptedBy === null) {
      throw new Error('Animal is locked because it has already been adopted.');
    }

    return Animal.findByIdAndUpdate(id, updatedAnimal).exec();
  }

  public static async addImage(id: any, imageLocation: string) {
    if (!(typeof id === 'string')) return Promise.resolve(null);
    const orginal = await this.get(id);
    if (orginal == null) {
      throw new Error(`Animal with id ${id} could not be found.`);
    }
    if (orginal !== null && orginal.adoptedBy === null) {
      throw new Error('Animal is locked because it has already been adopted.');
    }

    orginal.pictures!.push(imageLocation);
    return orginal.save();
  }

  public static delete(id: any) {
    return Animal.findByIdAndDelete(id).exec();
  }

  public static deleteAll() {
    return Animal.deleteMany({}).exec();
  }

  public static disconnect() {
    return mongoose.disconnect();
  }
}
