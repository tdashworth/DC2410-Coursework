import chai from 'chai';
import Animals, { IAnimal, Gender } from '../lib/Animals';
const expect = chai.expect;

const config = {
  db: {
    url: 'mongodb://localhost:27017/test',
  },
};

describe('Animals library', () => {
  let animals: Animals;
  const validanimals: IAnimal[] = [
    {
      name: 'Holly',
      description: 'Short haired domestic cat.',
      dob: new Date(2003, 11, 5),
      gender: Gender.Female,
    },
    {
      name: 'Mya',
      description: 'Black dog raised by Welsh family.',
      dob: new Date(2006, 6, 28),
      gender: Gender.Female,
    },
  ];

  const testEmpty = async () => {
    const result = await animals.readAll();
    expect(result).to.be.an('array');
    expect(result).to.be.empty;
  };

  // Connect the animals library to the DB before running the test.
  before(async () => {
    animals = new Animals();
    await animals.conect(config.db.url);
  });

  // Ensure that all animals are removed from the database before each test to
  // prevent the result of one test affecting the next.
  beforeEach(async () => {
    return animals.deleteAll();
  });

  // Disconnect the animals library from the DB after running all tests.
  after(async () => {
    return animals.disconnect();
  });

  it(
    'animals.create() can create a animal given data with name, description, dob, and ' +
    'picture properties. It returns a copy of the message with matching name, ' +
    'description, dob, and picture properties and an _id property.',
    async () => {
      const MESSAGE_IDX = 0;
      const result = await animals.create(validanimals[MESSAGE_IDX]);
      expect(result).to.be.an('object');
      if (result == null) return;
      expect(result).to.have.property('name');
      expect(result.name).to.equal(validanimals[MESSAGE_IDX].name);
      expect(result).to.have.property('description');
      expect(result.description).to.equal(validanimals[MESSAGE_IDX].description);
      expect(result).to.have.property('dob');
      expect(result.dob).to.equal(validanimals[MESSAGE_IDX].dob);
      expect(result).to.have.property('gender');
      expect(result.gender).to.equal(validanimals[MESSAGE_IDX].gender);
      expect(result).to.have.property('_id');
    },
  );

  it(
    'animals.read() reads a single animal created by animals.create() ' +
    'using the _id property returned by the latter.',
    async () => {
      const MESSAGE_IDX = 1;
      const createResult = await animals.create(validanimals[MESSAGE_IDX]);
      expect(createResult).to.be.an('object');
      if (createResult == null) return;
      expect(createResult).to.have.property('_id');

      const readResult = await animals.readId(createResult._id);
      if (readResult == null) return;
      expect(readResult).to.have.property('name');
      expect(readResult.name).to.equal(validanimals[MESSAGE_IDX].name);
      expect(readResult).to.have.property('description');
      expect(readResult.description).to.equal(validanimals[MESSAGE_IDX].description);
      expect(readResult).to.have.property('dob');
      expect(readResult.dob).to.equal(validanimals[MESSAGE_IDX].dob);
      expect(readResult).to.have.property('gender');
      expect(readResult.gender).to.equal(validanimals[MESSAGE_IDX].gender);
    },
  );

  it(
    'animals.readAll() reads all anaimals created by animals.create()',
    async () => {
      await Promise.all(validanimals.map(animal => animals.create(animal)));
      const result = await animals.readAll();

      expect(result.length).to.equal(validanimals.length);

      for (let i = 0; i < result.length; i += 1) {
        expect(result[i]).to.have.property('name');
        expect(result[i].name).to.equal(validanimals[i].name);
        expect(result[i]).to.have.property('description');
        expect(result[i].description).to.equal(validanimals[i].description);
        expect(result[i]).to.have.property('dob');
        expect(result[i].dob).to.deep.equal(validanimals[i].dob);
        expect(result[i]).to.have.property('gender');
        expect(result[i].gender).to.equal(validanimals[i].gender);
      }
    },
  );

  it(
    'animals.update() updates a single animal created by animal.create()' +
    ' using the _id property returned by the latter.',
    async () => {
      const ORIGINAL_MESSAGE_IDX = 0;
      const UPDATED_MESSAGE_IDX = 1;
      // Sanity check
      expect(validanimals[ORIGINAL_MESSAGE_IDX]).to.not.deep.equal(
        validanimals[UPDATED_MESSAGE_IDX],
      );

      const createResult = await animals.create(validanimals[ORIGINAL_MESSAGE_IDX]);
      expect(createResult).to.be.an('object');
      expect(createResult).to.have.property('_id');

      const updateResult = await animals.update(
        createResult._id,
        validanimals[UPDATED_MESSAGE_IDX],
      );
      expect(updateResult).to.be.an('object');
      if (updateResult == null) return;
      expect(updateResult).to.have.property('_id');

      const readResult = await animals.readId(updateResult._id);
      if (readResult == null) return;
      expect(readResult.name).to.equal(validanimals[UPDATED_MESSAGE_IDX].name);
      expect(readResult.description).to.equal(validanimals[UPDATED_MESSAGE_IDX].description);
      expect(readResult.dob).to.deep.equal(validanimals[UPDATED_MESSAGE_IDX].dob);
      expect(readResult.gender).to.equal(validanimals[UPDATED_MESSAGE_IDX].gender);
    },
  );

  it(
    'animals.delete() deletes a single message created by animals.create()' +
    ' using the _id property returned by the latter.',
    async () => {
      const MESSAGE_IDX = 0;
      const createResult = await animals.create(validanimals[MESSAGE_IDX]);
      expect(createResult).to.be.an('object');
      expect(createResult).to.have.property('_id');

      await animals.delete(createResult._id);

      const readResult = await animals.readId(createResult._id);
      expect(readResult).to.be.null;
    },
  );

  it('animals.deleteAll() deletes all animals created by animals.create()', async () => {
    const MESSAGE_1_IDX = 0;
    const MESSAGE_2_IDX = 1;
    await animals.create(validanimals[MESSAGE_1_IDX]);
    await animals.create(validanimals[MESSAGE_2_IDX]);
    await animals.deleteAll();
    return testEmpty();
  });
});
