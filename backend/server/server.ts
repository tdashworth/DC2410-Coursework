import mongoose from 'mongoose';
import app from './app';
import { populateUsers, populateAnimals, populateRequests } from './data';

const url =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/dc2410-coursework';
const port = process.env.PORT || 9000;

(async () => {
  // Connect to the database
  await mongoose.connect(url, { useNewUrlParser: true });

  // Load data if none
  await populateUsers();
  await populateAnimals();
  await populateRequests();

  // Start express App
  app.listen(port);
  console.log(`App listening on port ${port}...`);
})();
