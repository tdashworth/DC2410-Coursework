import mongoose from 'mongoose';
import app from './app';
import Animals from './animals/animals.model';
import { animals } from './data';

const url =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/dc2410-coursework';
const port = process.env.PORT || 9000;

const populateAnimals = async () => {
  const retrievedAnimals = await Animals.listAll();

  if (retrievedAnimals.length > 0) {
    console.log('Animal populating: already loaded.');
    return;
  }

  console.log('Animal population: loading data...');

  await Promise.all(animals.map(animal => Animals.create(animal)));

  console.log('Animal population: loaded data.');
};

(async () => {
  // Connect to the database
  await mongoose.connect(url, { useNewUrlParser: true });

  // Load animals if none
  await populateAnimals();

  // Start express App
  app.listen(port);
  console.log(`App listening on port ${port}...`);
})();
