import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';

export enum Gender {
  Male,
  Female,
}

export interface IAnimal {
  name: string;
  description: string;
  dob: Date;
  picture?: string;
  gender: Gender;
  adoptedBy?: Number;
}

export interface IAnimalModel extends IAnimal, mongoose.Document { }

// tslint:disable-next-line:variable-name
export const AnimalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    dob: { type: Date, required: true },
    picture: { type: String, required: false },
    gender: { type: Gender, required: true },
    adoptedBy: { type: Number },
  },
  { strict: 'throw' },
);

AnimalSchema.pre('save', async function (this: IAnimalModel) {
  this.name = sanitizeHtml(this.name);
  this.description = sanitizeHtml(this.description);
});

// tslint:disable-next-line:variable-name
let Animal: mongoose.Model<IAnimalModel, {}>;

export default class Animals {
  async conect(url: string) {
    await mongoose.connect(
      url, {
        useNewUrlParser: true,
        useFindAndModify: false,
      },
    );
    Animal = mongoose.model<IAnimalModel>('Animal', AnimalSchema);
  }

  create(newAnimal: IAnimal): Promise<IAnimalModel> {
    return new Animal(newAnimal).save();
  }

  readId(id: any): Promise<IAnimalModel | null> {
    if (typeof id !== 'number') return Promise.resolve(null);
    return Animal.findById(id).exec();
  }

  readAll(): Promise<IAnimalModel[]> {
    return Animal.find({}).exec();
  }

  update(id: any, updatedAnimal: IAnimal) {
    return Animal.findOneAndUpdate(id, updatedAnimal).exec();
  }

  delete(id: any) {
    return Animal.findByIdAndDelete(id).exec();
  }

  deleteAll() {
    return Animal.deleteMany({}).exec();
  }

  disconnect() {
    return mongoose.disconnect();
  }
}
