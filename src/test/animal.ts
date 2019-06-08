import chai from 'chai';
import mongoose from 'mongoose';
import Animals, { IAnimal, Gender, AnimalType } from '../lib/Animals';
const expect = chai.expect;

describe('Animals library', () => {
  let animals: Animals;

  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    animals = new Animals();
  });

  beforeEach(async () => {
    return animals.deleteAll();
  });

  after(async () => {
    return animals.disconnect();
  });

  it(
    'animals.create() can create a animal given data with name, description, dob, and ' +
    'gender properties. It returns a copy of the message with matching name, ' +
    'description, dob, and gender properties and an id property.',
    async () => {
      const animal = {
        name: 'Holly',
        type: AnimalType.Cat,
        description: 'Short haired domestic cat.',
        dob: new Date(2003, 11, 5),
        gender: Gender.Female,
      };

      const result = await animals.create(animal);

      expect(result).to.be.an('object');
      if (result == null) throw new Error('Result return null');
      expect(result).to.have.property('name');
      expect(result.name).to.equal(animal.name);
      expect(result).to.have.property('description');
      expect(result.description).to.equal(animal.description);
      expect(result).to.have.property('dob');
      expect(result.dob).to.equal(animal.dob);
      expect(result).to.have.property('gender');
      expect(result.gender).to.equal(animal.gender);
      expect(result).to.have.property('id');
    },
  );

  it(
    'animals.get() reads a single animal created by animals.create() ' +
    'using the id property returned by the latter.',
    async () => {
      const animal = {
        name: 'Holly',
        type: AnimalType.Cat,
        description: 'Short haired domestic cat.',
        dob: new Date(2003, 11, 5),
        gender: Gender.Female,
      };
      const createResult = await animals.create(animal);

      const readResult = await animals.get(createResult._id);

      if (readResult == null) throw new Error('Result return null');
      expect(readResult).to.have.property('name');
      expect(readResult.name).to.equal(animal.name);
      expect(readResult).to.have.property('description');
      expect(readResult.description).to.equal(animal.description);
      expect(readResult).to.have.property('dob');
      expect(readResult.dob).to.deep.equal(animal.dob);
      expect(readResult).to.have.property('gender');
      expect(readResult.gender).to.equal(animal.gender);
    },
  );

  it(
    'animals.update() updates a single animal created by animal.create()' +
    ' using the id property returned by the latter.',
    async () => {
      const animal1 = {
        name: 'Holly',
        type: AnimalType.Cat,
        description: 'Short haired domestic cat.',
        dob: new Date(2003, 11, 5),
        gender: Gender.Female,
      };
      const animal2 = {
        name: 'Mya',
        type: AnimalType.Dog,
        description : 'Black dog raised by Welsh family.',
        dob : new Date(2006, 6, 28),
        gender : Gender.Female,
      };
      const createResult = await animals.create(animal1);

      const updateResult = await animals.update(createResult._id, animal2);
      expect(updateResult).to.be.an('object');
      if (updateResult == null) throw new Error('Result return null');
      expect(updateResult).to.have.property('id');

      const readResult = await animals.get(updateResult._id);
      if (readResult == null) throw new Error('Result return null');
      expect(readResult.name).to.equal(animal2.name);
      expect(readResult.description).to.equal(animal2.description);
      expect(readResult.dob).to.deep.equal(animal2.dob);
      expect(readResult.gender).to.equal(animal2.gender);
    },
  );

  it(
    'animals.listAll() reads all anaimals created by animals.create()',
    async () => {
      const animal1 = {
        name: 'Holly',
        type: AnimalType.Cat,
        description: 'Short haired domestic cat.',
        dob: new Date(2003, 11, 5),
        gender: Gender.Female,
      };
      const animal2 = {
        name: 'Mya',
        type: AnimalType.Dog,
        description : 'Black dog raised by Welsh family.',
        dob : new Date(2006, 6, 28),
        gender : Gender.Female,
      };
      await animals.create(animal1);
      await animals.create(animal2);

      const result = await animals.listAll();

      expect(result.length).to.equal(2);
      expect(result[0]).to.have.property('name');
      expect(result[0].name).to.equal(animal1.name);
      expect(result[0]).to.have.property('description');
      expect(result[0].description).to.equal(animal1.description);
      expect(result[0]).to.have.property('dob');
      expect(result[0].dob).to.deep.equal(animal1.dob);
      expect(result[0]).to.have.property('gender');
      expect(result[0].gender).to.equal(animal1.gender);
      expect(result[1]).to.have.property('name');
      expect(result[1].name).to.equal(animal2.name);
      expect(result[1]).to.have.property('description');
      expect(result[1].description).to.equal(animal2.description);
      expect(result[1]).to.have.property('dob');
      expect(result[1].dob).to.deep.equal(animal2.dob);
      expect(result[1]).to.have.property('gender');
      expect(result[1].gender).to.equal(animal2.gender);
    },
  );

  it(
    'animals.listAllAvailable() reads all anaimals created by animals.create()',
    async () => {
      const animal1 = {
        name: 'Holly',
        type: AnimalType.Cat,
        description: 'Short haired domestic cat.',
        dob: new Date(2003, 11, 5),
        gender: Gender.Female,
      };
      const animal2 = {
        name: 'Mya',
        type: AnimalType.Dog,
        description : 'Black dog raised by Welsh family.',
        dob : new Date(2006, 6, 28),
        gender : Gender.Female,
        adoptedBy: 'fakeUserId',
      };
      await animals.create(animal1);
      await animals.create(animal2);

      const result = await animals.listAllAvailable();

      expect(result.length).to.equal(1);
      expect(result[0]).to.have.property('name');
      expect(result[0].name).to.equal(animal1.name);
      expect(result[0]).to.have.property('description');
      expect(result[0].description).to.equal(animal1.description);
      expect(result[0]).to.have.property('dob');
      expect(result[0].dob).to.deep.equal(animal1.dob);
      expect(result[0]).to.have.property('gender');
      expect(result[0].gender).to.equal(animal1.gender);
    },
  );
});
