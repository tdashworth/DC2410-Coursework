// import chai from 'chai';
// const mongoose = require('mongoose');
// import AdoptionRequestsModel, {
//   AdoptionRequestStatus,
// } from './adoptionRequests.model';
// import UsersModel from '../../backend/server/users/users.model';
// import AnimalsModel, { AnimalType, Gender } from '../animals/animals.model';
// const expect = chai.expect;

// describe('Adoption Requests library', function () {
//   this.timeout(3000);

//   before(async () => {
//     await mongoose.connect('mongodb://localhost:27017/dc2410-coursework-test', {
//       useNewUrlParser: true,
//       useFindAndModify: false,
//     });
//   });

//   beforeEach(async () => {
//     await AdoptionRequestsModel.deleteAll();
//     await UsersModel.deleteAll();
//     await AnimalsModel.deleteAll();
//   });

//   after(async () => {
//     await AdoptionRequestsModel.disconnect();
//     await UsersModel.disconnect();
//     await AnimalsModel.disconnect();
//   });

//   it(
//     'adoptionRequestsModel.create() can create a adoption request given data with user and animal ' +
//       'properties. It returns a copy of the message with matching user, and animal properties ' +
//       'and an id property.',
//     async () => {
//       const user = await UsersModel.create({
//         username: 'a',
//         passwordHash: 'p',
//         displayName: 'A',
//       });
//       const animal = await AnimalsModel.create({
//         name: 'A',
//         type: AnimalType.Cat,
//         description: 'd',
//         gender: Gender.Female,
//         dob: new Date(),
//       });
//       const adoptionRequest = {
//         user: user.id,
//         animal: animal.id,
//       };

//       const result = await AdoptionRequestsModel.create(adoptionRequest);

//       expect(result).to.be.an('object');
//       if (result == null) throw new Error('Result return null');
//       expect(result).to.have.property('user');
//       expect(result.user).to.equal(adoptionRequest.user);
//       expect(result).to.have.property('animal');
//       expect(result.animal).to.equal(adoptionRequest.animal);
//       expect(result).to.have.property('status');
//       expect(result.status).to.equal(AdoptionRequestStatus.Pending);
//       expect(result).to.have.property('id');
//     },
//   );

//   it(
//     'adoptionRequestsModel.get() reads a single adoption request created by adoptionRequestsModel.create() ' +
//       'using the id property returned by the latter.',
//     async () => {
//       const user = await UsersModel.create({
//         username: 'a',
//         passwordHash: 'p',
//         displayName: 'A',
//       });
//       const animal = await AnimalsModel.create({
//         name: 'A',
//         type: AnimalType.Cat,
//         description: 'd',
//         gender: Gender.Female,
//         dob: new Date(),
//       });
//       const adoptionRequest = {
//         user: user.id,
//         animal: animal.id,
//       };
//       const createResult = await AdoptionRequestsModel.create(adoptionRequest);

//       const readResult = await AdoptionRequestsModel.get(createResult._id);

//       expect(readResult).to.be.an('object');
//       if (readResult == null) throw new Error('Result return null');
//       expect(readResult).to.have.property('user');
//       expect(readResult.user).to.equal(adoptionRequest.user);
//       expect(readResult).to.have.property('animal');
//       expect(readResult.animal).to.equal(adoptionRequest.animal);
//       expect(readResult).to.have.property('status');
//       expect(readResult.status).to.equal(AdoptionRequestStatus.Pending);
//       expect(readResult).to.have.property('id');
//     },
//   );

//   it(
//     'adoptionRequestsModel.approve() approves a single adoption request created by ' +
//       'adoptionRequest.create() using the id property returned by the latter.',
//     async () => {
//       const user1 = await UsersModel.create({
//         username: 'u1',
//         passwordHash: 'p',
//         displayName: 'U1',
//       });
//       const animal1 = await AnimalsModel.create({
//         name: 'A1',
//         type: AnimalType.Cat,
//         description: 'd',
//         gender: Gender.Female,
//         dob: new Date(),
//       });
//       const adoptionRequest1 = {
//         user: user1.id,
//         animal: animal1.id,
//       };
//       const user2 = await UsersModel.create({
//         username: 'u2',
//         passwordHash: 'p',
//         displayName: 'U2',
//       });
//       const adoptionRequest2 = {
//         user: user2.id,
//         animal: animal1.id,
//       };
//       const createResult1 = await AdoptionRequestsModel.create(adoptionRequest1);
//       const createResult2 = await AdoptionRequestsModel.create(adoptionRequest2);

//       await AdoptionRequestsModel.approve(createResult1._id);

//       const readResult1 = await AdoptionRequestsModel.get(createResult1._id);
//       if (readResult1 == null) throw new Error('Result return null');
//       expect(readResult1.status).to.equal(AdoptionRequestStatus.Approved);
//       const readResult2 = await AdoptionRequestsModel.get(createResult2._id);
//       if (readResult2 == null) throw new Error('Result return null');
//       expect(readResult2.status).to.equal(AdoptionRequestStatus.Denied);
//     },
//   );

//   it(
//     'adoptionRequestsModel.deny() denys a single adoption request created by ' +
//       'adoptionRequest.create() using the id property returned by the latter.',
//     async () => {
//       const user = await UsersModel.create({
//         username: 'u1',
//         passwordHash: 'p',
//         displayName: 'U1',
//       });
//       const animal = await AnimalsModel.create({
//         name: 'A1',
//         type: AnimalType.Cat,
//         description: 'd',
//         gender: Gender.Female,
//         dob: new Date(),
//       });
//       const adoptionRequest = {
//         user: user.id,
//         animal: animal.id,
//       };
//       const createResult = await AdoptionRequestsModel.create(adoptionRequest);

//       await AdoptionRequestsModel.deny(createResult._id);

//       const readResult = await AdoptionRequestsModel.get(createResult._id);
//       if (readResult == null) throw new Error('Result return null');
//       expect(readResult.status).to.equal(AdoptionRequestStatus.Denied);
//     },
//   );

//   // tslint:disable-next-line: max-line-length
//   it('adoptionRequestsModel.listAll() reads all adoption requests created by adoptionRequestsModel.create()', async () => {
//     const user1 = await UsersModel.create({
//       username: 'u1',
//       passwordHash: 'p',
//       displayName: 'U1',
//     });
//     const animal1 = await AnimalsModel.create({
//       name: 'A1',
//       type: AnimalType.Cat,
//       description: 'd',
//       gender: Gender.Female,
//       dob: new Date(),
//     });
//     const adoptionRequest1 = await AdoptionRequestsModel.create({
//       user: user1.id,
//       animal: animal1.id,
//     });
//     const user2 = await UsersModel.create({
//       username: 'u2',
//       passwordHash: 'p',
//       displayName: 'U2',
//     });
//     const animal2 = await AnimalsModel.create({
//       name: 'A2',
//       type: AnimalType.Cat,
//       description: 'd',
//       gender: Gender.Female,
//       dob: new Date(),
//     });
//     const adoptionRequest2 = await AdoptionRequestsModel.create({
//       user: user2.id,
//       animal: animal2.id,
//     });

//     const result = await AdoptionRequestsModel.listAll();

//     expect(result).to.be.an('array');
//     expect(result.length).to.equal(2);
//     expect(result[0]).to.have.property('user');
//     expect(result[0].user).to.equal(adoptionRequest1.user);
//     expect(result[0]).to.have.property('animal');
//     expect(result[0].animal).to.equal(adoptionRequest1.animal);
//     expect(result[0]).to.have.property('status');
//     expect(result[0].status).to.equal(AdoptionRequestStatus.Pending);
//     expect(result[1]).to.have.property('user');
//     expect(result[1].user).to.equal(adoptionRequest2.user);
//     expect(result[1]).to.have.property('animal');
//     expect(result[1].animal).to.equal(adoptionRequest2.animal);
//     expect(result[1]).to.have.property('status');
//     expect(result[1].status).to.equal(AdoptionRequestStatus.Pending);
//   });

//   it(
//     'adoptionRequestsModel.listAllForUser() reads all adoption requests created by ' +
//       'adoptionRequestsModel.create() for a single user given',
//     async () => {
//       const user1 = await UsersModel.create({
//         username: 'u1',
//         passwordHash: 'p',
//         displayName: 'U1',
//       });
//       const animal1 = await AnimalsModel.create({
//         name: 'A1',
//         type: AnimalType.Cat,
//         description: 'd',
//         gender: Gender.Female,
//         dob: new Date(),
//       });
//       const adoptionRequest1 = await AdoptionRequestsModel.create({
//         user: user1.id,
//         animal: animal1.id,
//       });
//       const user2 = await UsersModel.create({
//         username: 'u2',
//         passwordHash: 'p',
//         displayName: 'U2',
//       });
//       const animal2 = await AnimalsModel.create({
//         name: 'A2',
//         type: AnimalType.Cat,
//         description: 'd',
//         gender: Gender.Female,
//         dob: new Date(),
//       });
//       const adoptionRequest2 = await AdoptionRequestsModel.create({
//         user: user2.id,
//         animal: animal2.id,
//       });

//       const result = await AdoptionRequestsModel.listAllForUser(user1.id);

//       expect(result).to.be.an('array');
//       expect(result.length).to.equal(1);
//       expect(result[0]).to.have.property('user');
//       expect(result[0].user).to.equal(adoptionRequest1.user);
//       expect(result[0]).to.have.property('animal');
//       expect(result[0].animal).to.equal(adoptionRequest1.animal);
//       expect(result[0]).to.have.property('status');
//       expect(result[0].status).to.equal(AdoptionRequestStatus.Pending);
//     },
//   );

//   it(
//     'adoptionRequestsModel.listAllForAnimal() reads all adoption requests created by ' +
//       'adoptionRequestsModel.create() for a single animal given',
//     async () => {
//       const user1 = await UsersModel.create({
//         username: 'u1',
//         passwordHash: 'p',
//         displayName: 'U1',
//       });
//       const animal1 = await AnimalsModel.create({
//         name: 'A1',
//         type: AnimalType.Cat,
//         description: 'd',
//         gender: Gender.Female,
//         dob: new Date(),
//       });
//       const adoptionRequest1 = await AdoptionRequestsModel.create({
//         user: user1.id,
//         animal: animal1.id,
//       });
//       const user2 = await UsersModel.create({
//         username: 'u2',
//         passwordHash: 'p',
//         displayName: 'U2',
//       });
//       const animal2 = await AnimalsModel.create({
//         name: 'A2',
//         type: AnimalType.Cat,
//         description: 'd',
//         gender: Gender.Female,
//         dob: new Date(),
//       });
//       const adoptionRequest2 = await AdoptionRequestsModel.create({
//         user: user2.id,
//         animal: animal2.id,
//       });

//       const result = await AdoptionRequestsModel.listAllForAnimal(animal1.id);

//       expect(result).to.be.an('array');
//       expect(result.length).to.equal(1);
//       expect(result[0]).to.have.property('user');
//       expect(result[0].user).to.equal(adoptionRequest1.user);
//       expect(result[0]).to.have.property('animal');
//       expect(result[0].animal).to.equal(adoptionRequest1.animal);
//       expect(result[0]).to.have.property('status');
//       expect(result[0].status).to.equal(AdoptionRequestStatus.Pending);
//     },
//   );
// });
