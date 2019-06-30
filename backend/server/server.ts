import mongoose from 'mongoose';
import app from './app';
// tslint:disable-next-line: import-name
import Users from './users/users.model';
import { UserType } from 'dc2410-coursework-common';

const url =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/dc2410-coursework';
const port = process.env.PORT || 9000;

(async () => {
  // Connect to the database
  await mongoose.connect(url, { useNewUrlParser: true });

  // await populateDB();

  // Start express App
  app.listen(port);
  console.log(`App listening on port ${port}...`);
})();

async function populateDB() {
  if((await Users.listAll()).length > 0) return;

  await Users.create({
    displayName: 'Tom',
    username: 'tdashworth',
    type: UserType.Internal,
    passwordHash: ''
  });
}
