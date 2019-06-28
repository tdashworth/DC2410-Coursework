import { Document, model, Schema } from 'mongoose';
import { SchemaDef } from '../../types';
import { Animal, AnimalType, Gender } from 'dc2410-coursework-common';

// Declare model interface
interface AnimalDoc extends Animal, Document {}

// Define model schema
const animalSchema = new Schema({
  name: { type: String, required: true },
  type: { type: AnimalType, required: true },
  dob: { type: Date, required: true },
  description: { type: String, required: true },
  gender: { type: Gender, required: true },
  picture: { type: String, required: false },
  adoptedBy: { type: String, required: false },
});

export default model<AnimalDoc>('Item', animalSchema);
