import chai from 'chai';
const mongoose = require('mongoose');
import AdoptionRequests, {
  AdoptionRequestStatus,
} from '../lib/AdoptionRequests';
import Users from '../lib/Users';
import Animals, { AnimalType, Gender } from '../lib/Animals';
const expect = chai.expect;

describe('Adoption Requests library', function () {
  this.timeout(3000);

  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/dc2410-coursework-test', {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  });

  beforeEach(async () => {
    await AdoptionRequests.deleteAll();
    await Users.deleteAll();
    await Animals.deleteAll();
  });

  after(async () => {
    await AdoptionRequests.disconnect();
    await Users.disconnect();
    await Animals.disconnect();
  });

  it(
    'adoptionRequests.create() can create a adoption request given data with user and animal ' +
      'properties. It returns a copy of the message with matching user, and animal properties ' +
      'and an id property.',
    async () => {
      const user = await Users.create({
        username: 'a',
        passwordHash: 'p',
        displayName: 'A',
      });
      const animal = await Animals.create({
        name: 'A',
        type: AnimalType.Cat,
        description: 'd',
        gender: Gender.Female,
        dob: new Date(),
      });
      const adoptionRequest = {
        user: user.id,
        animal: animal.id,
      };

      const result = await AdoptionRequests.create(adoptionRequest);

      expect(result).to.be.an('object');
      if (result == null) throw new Error('Result return null');
      expect(result).to.have.property('user');
      expect(result.user).to.equal(adoptionRequest.user);
      expect(result).to.have.property('animal');
      expect(result.animal).to.equal(adoptionRequest.animal);
      expect(result).to.have.property('status');
      expect(result.status).to.equal(AdoptionRequestStatus.Pending);
      expect(result).to.have.property('id');
    },
  );

  it(
    'adoptionRequests.get() reads a single adoption request created by adoptionRequests.create() ' +
      'using the id property returned by the latter.',
    async () => {
      const user = await Users.create({
        username: 'a',
        passwordHash: 'p',
        displayName: 'A',
      });
      const animal = await Animals.create({
        name: 'A',
        type: AnimalType.Cat,
        description: 'd',
        gender: Gender.Female,
        dob: new Date(),
      });
      const adoptionRequest = {
        user: user.id,
        animal: animal.id,
      };
      const createResult = await AdoptionRequests.create(adoptionRequest);

      const readResult = await AdoptionRequests.get(createResult._id);

      expect(readResult).to.be.an('object');
      if (readResult == null) throw new Error('Result return null');
      expect(readResult).to.have.property('user');
      expect(readResult.user).to.equal(adoptionRequest.user);
      expect(readResult).to.have.property('animal');
      expect(readResult.animal).to.equal(adoptionRequest.animal);
      expect(readResult).to.have.property('status');
      expect(readResult.status).to.equal(AdoptionRequestStatus.Pending);
      expect(readResult).to.have.property('id');
    },
  );

  it(
    'adoptionRequests.approve() approves a single adoption request created by ' +
      'adoptionRequest.create() using the id property returned by the latter.',
    async () => {
      const user1 = await Users.create({
        username: 'u1',
        passwordHash: 'p',
        displayName: 'U1',
      });
      const animal1 = await Animals.create({
        name: 'A1',
        type: AnimalType.Cat,
        description: 'd',
        gender: Gender.Female,
        dob: new Date(),
      });
      const adoptionRequest1 = {
        user: user1.id,
        animal: animal1.id,
      };
      const user2 = await Users.create({
        username: 'u2',
        passwordHash: 'p',
        displayName: 'U2',
      });
      const adoptionRequest2 = {
        user: user2.id,
        animal: animal1.id,
      };
      const createResult1 = await AdoptionRequests.create(adoptionRequest1);
      const createResult2 = await AdoptionRequests.create(adoptionRequest2);

      await AdoptionRequests.approve(createResult1._id);

      const readResult1 = await AdoptionRequests.get(createResult1._id);
      if (readResult1 == null) throw new Error('Result return null');
      expect(readResult1.status).to.equal(AdoptionRequestStatus.Approved);
      const readResult2 = await AdoptionRequests.get(createResult2._id);
      if (readResult2 == null) throw new Error('Result return null');
      expect(readResult2.status).to.equal(AdoptionRequestStatus.Denied);
    },
  );

  it(
    'adoptionRequests.deny() denys a single adoption request created by ' +
      'adoptionRequest.create() using the id property returned by the latter.',
    async () => {
      const user = await Users.create({
        username: 'u1',
        passwordHash: 'p',
        displayName: 'U1',
      });
      const animal = await Animals.create({
        name: 'A1',
        type: AnimalType.Cat,
        description: 'd',
        gender: Gender.Female,
        dob: new Date(),
      });
      const adoptionRequest = {
        user: user.id,
        animal: animal.id,
      };
      const createResult = await AdoptionRequests.create(adoptionRequest);

      await AdoptionRequests.deny(createResult._id);

      const readResult = await AdoptionRequests.get(createResult._id);
      if (readResult == null) throw new Error('Result return null');
      expect(readResult.status).to.equal(AdoptionRequestStatus.Denied);
    },
  );

  // tslint:disable-next-line: max-line-length
  it('adoptionRequests.listAll() reads all adoption requests created by adoptionRequests.create()', async () => {
    const user1 = await Users.create({
      username: 'u1',
      passwordHash: 'p',
      displayName: 'U1',
    });
    const animal1 = await Animals.create({
      name: 'A1',
      type: AnimalType.Cat,
      description: 'd',
      gender: Gender.Female,
      dob: new Date(),
    });
    const adoptionRequest1 = await AdoptionRequests.create({
      user: user1.id,
      animal: animal1.id,
    });
    const user2 = await Users.create({
      username: 'u2',
      passwordHash: 'p',
      displayName: 'U2',
    });
    const animal2 = await Animals.create({
      name: 'A2',
      type: AnimalType.Cat,
      description: 'd',
      gender: Gender.Female,
      dob: new Date(),
    });
    const adoptionRequest2 = await AdoptionRequests.create({
      user: user2.id,
      animal: animal2.id,
    });

    const result = await AdoptionRequests.listAll();

    expect(result).to.be.an('array');
    expect(result.length).to.equal(2);
    expect(result[0]).to.have.property('user');
    expect(result[0].user).to.equal(adoptionRequest1.user);
    expect(result[0]).to.have.property('animal');
    expect(result[0].animal).to.equal(adoptionRequest1.animal);
    expect(result[0]).to.have.property('status');
    expect(result[0].status).to.equal(AdoptionRequestStatus.Pending);
    expect(result[1]).to.have.property('user');
    expect(result[1].user).to.equal(adoptionRequest2.user);
    expect(result[1]).to.have.property('animal');
    expect(result[1].animal).to.equal(adoptionRequest2.animal);
    expect(result[1]).to.have.property('status');
    expect(result[1].status).to.equal(AdoptionRequestStatus.Pending);
  });

  it(
    'adoptionRequests.listAllForUser() reads all adoption requests created by ' +
      'adoptionRequests.create() for a single user given',
    async () => {
      const user1 = await Users.create({
        username: 'u1',
        passwordHash: 'p',
        displayName: 'U1',
      });
      const animal1 = await Animals.create({
        name: 'A1',
        type: AnimalType.Cat,
        description: 'd',
        gender: Gender.Female,
        dob: new Date(),
      });
      const adoptionRequest1 = await AdoptionRequests.create({
        user: user1.id,
        animal: animal1.id,
      });
      const user2 = await Users.create({
        username: 'u2',
        passwordHash: 'p',
        displayName: 'U2',
      });
      const animal2 = await Animals.create({
        name: 'A2',
        type: AnimalType.Cat,
        description: 'd',
        gender: Gender.Female,
        dob: new Date(),
      });
      const adoptionRequest2 = await AdoptionRequests.create({
        user: user2.id,
        animal: animal2.id,
      });

      const result = await AdoptionRequests.listAllForUser(user1.id);

      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0]).to.have.property('user');
      expect(result[0].user).to.equal(adoptionRequest1.user);
      expect(result[0]).to.have.property('animal');
      expect(result[0].animal).to.equal(adoptionRequest1.animal);
      expect(result[0]).to.have.property('status');
      expect(result[0].status).to.equal(AdoptionRequestStatus.Pending);
    },
  );

  it(
    'adoptionRequests.listAllForAnimal() reads all adoption requests created by ' +
      'adoptionRequests.create() for a single animal given',
    async () => {
      const user1 = await Users.create({
        username: 'u1',
        passwordHash: 'p',
        displayName: 'U1',
      });
      const animal1 = await Animals.create({
        name: 'A1',
        type: AnimalType.Cat,
        description: 'd',
        gender: Gender.Female,
        dob: new Date(),
      });
      const adoptionRequest1 = await AdoptionRequests.create({
        user: user1.id,
        animal: animal1.id,
      });
      const user2 = await Users.create({
        username: 'u2',
        passwordHash: 'p',
        displayName: 'U2',
      });
      const animal2 = await Animals.create({
        name: 'A2',
        type: AnimalType.Cat,
        description: 'd',
        gender: Gender.Female,
        dob: new Date(),
      });
      const adoptionRequest2 = await AdoptionRequests.create({
        user: user2.id,
        animal: animal2.id,
      });

      const result = await AdoptionRequests.listAllForAnimal(animal1.id);

      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0]).to.have.property('user');
      expect(result[0].user).to.equal(adoptionRequest1.user);
      expect(result[0]).to.have.property('animal');
      expect(result[0].animal).to.equal(adoptionRequest1.animal);
      expect(result[0]).to.have.property('status');
      expect(result[0].status).to.equal(AdoptionRequestStatus.Pending);
    },
  );
});
