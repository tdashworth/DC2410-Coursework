import chai from 'chai';
import Users, { IUser } from '../lib/Users';
const expect = chai.expect;

const config = {
  db: {
    url: 'mongodb://localhost:27017/test',
  },
};

describe('Users library', () => {
  let users: Users;
  const validusers = [
    {
      username: 'Alice',
      passwordHash: 'Password1',
    },
    {
      username: 'Bob',
      passwordHash: 'Password2',
    },
  ];

  const testEmpty = async () => {
    const result = await users.readAll();
    expect(result).to.be.an('array');
    expect(result).to.be.empty;
  };

  // Connect the users library to the DB before running the test.
  before(async () => {
    users = new Users();
    await users.conect(config.db.url);
  });

  // Ensure that all users are removed from the database before each test to
  // prevent the result of one test affecting the next.
  beforeEach(async () => {
    return users.deleteAll();
  });

  // Disconnect the users library from the DB after running all tests.
  after(async () => {
    return users.disconnect();
  });

  /* 1.2 Simple create and read*/
  it(
    'users.create() can create a user given data with username and ' +
    'passwordHash properties. It returns a copy of the message with matching username' +
    ' and passwordHash properties and an _id property.',
    async () => {
      const MESSAGE_IDX = 0;
      const result = await users.create(validusers[MESSAGE_IDX]);
      expect(result).to.be.an('object');
      if (result == null) return;
      expect(result).to.have.property('username');
      expect(result.username).to.equal(validusers[MESSAGE_IDX].username);
      expect(result).to.have.property('passwordHash');
      expect(result.passwordHash).to.equal(validusers[MESSAGE_IDX].passwordHash);
      expect(result).to.have.property('_id');
    },
  );

  it(
    'users.read() reads a single user created by users.create() ' +
    'using the _id property returned by the latter.',
    async () => {
      const MESSAGE_IDX = 0;
      const createResult = await users.create(validusers[MESSAGE_IDX]);
      expect(createResult).to.be.an('object');
      if (createResult == null) return;
      expect(createResult).to.have.property('_id');

      const readResult = await users.readId(createResult._id);
      if (readResult == null) return;
      expect(readResult).to.have.property('username');
      expect(readResult.username).to.equal(validusers[MESSAGE_IDX].username);
      expect(readResult).to.have.property('passwordHash');
      expect(readResult.passwordHash).to.equal(validusers[MESSAGE_IDX].passwordHash);
    },
  );

  /* 1.3 Remaining CRUD functions */
  it(
    'users.readAll() reads all users created by users.create()',
    async () => {
      const MESSAGE_1_IDX = 0;
      const MESSAGE_2_IDX = 1;

      await users.create(validusers[MESSAGE_1_IDX]);
      await users.create(validusers[MESSAGE_2_IDX]);
      const readResult = await users.readAll();

      expect(readResult.length).to.equal(2);

      const expectedNames = [
        validusers[MESSAGE_1_IDX].username,
        validusers[MESSAGE_2_IDX].username,
      ];
      const expectedPasswordHashs = [
        validusers[MESSAGE_1_IDX].passwordHash,
        validusers[MESSAGE_2_IDX].passwordHash,
      ];

      const names = readResult.map((m: { username: any }) => m.username);
      const passwordHashs = readResult.map((m: { passwordHash: any }) => m.passwordHash);

      expect(names).to.have.members(expectedNames);
      expect(passwordHashs).to.have.members(expectedPasswordHashs);
    });

  it(
    'users.update() updates a single message created by users.create()' +
    ' using the _id property returned by the latter.',
    async () => {
      const ORIGINAL_MESSAGE_IDX = 0;
      const UPDATED_MESSAGE_IDX = 1;
      // Sanity check
      expect(validusers[ORIGINAL_MESSAGE_IDX]).to.not.deep.equal(
        validusers[UPDATED_MESSAGE_IDX],
      );

      const createResult = await users.create(validusers[ORIGINAL_MESSAGE_IDX]);
      expect(createResult).to.be.an('object');
      expect(createResult).to.have.property('_id');

      const updateResult = await users.update(createResult._id, validusers[UPDATED_MESSAGE_IDX]);
      expect(updateResult).to.be.an('object');
      if (updateResult == null) return;
      expect(updateResult).to.have.property('_id');

      const readResult = await users.readId(updateResult._id);
      if (readResult == null) return;
      expect(readResult.username).to.equal(validusers[UPDATED_MESSAGE_IDX].username);
      expect(readResult.passwordHash).to.equal(validusers[UPDATED_MESSAGE_IDX].passwordHash);
    },
  );

  it(
    'users.delete() deletes a single message created by users.create()' +
    ' using the _id property returned by the latter.',
    async () => {
      const MESSAGE_IDX = 0;
      const createResult = await users.create(validusers[MESSAGE_IDX]);
      expect(createResult).to.be.an('object');
      expect(createResult).to.have.property('_id');

      await users.delete(createResult._id);

      const readResult = await users.readId(createResult._id);
      expect(readResult).to.be.null;
    },
  );

  it('users.deleteAll() deletes all users created by users.create()', async () => {
    const MESSAGE_1_IDX = 0;
    const MESSAGE_2_IDX = 1;
    await users.create(validusers[MESSAGE_1_IDX]);
    await users.create(validusers[MESSAGE_2_IDX]);
    await users.deleteAll();
    return testEmpty();
  });

  /* 1.4 Data validation */
  it(
    'users.create() fails to create users given data which is missing ' +
    'username and/or passwordHash properties.',
    () => {
      const emptyMessage = {};
      const usernameMessage = { username: 'Carol' };
      const passwordMessage = { passwordHash: 'Password10' };
      const testCreateFail = async (user: any) => {
        await users.create(user)
          .catch(err => expect(err.message).to.contain('User validation failed:'));
      };

      return Promise.all([
        testCreateFail(emptyMessage),
        testCreateFail(usernameMessage),
        testCreateFail(passwordMessage),
      ]);
    },
  );

  it(
    'users.create() fails to create users given username and/or passwordHash ' +
    'properties which are not convertible to string.',
    async () => {
      const usernameMessage = {
        username: { prop: 'val' },
        passwordHash: 'Password10',
      };
      const user = { username: 'Carol', passwordHash: { prop: 'val' } };
      const testCreateFail = async (user: any) => {
        await users.create(user)
          .catch(err => expect(err.message).to.contain('User validation failed:'));
      };

      await testCreateFail(usernameMessage);
      await testCreateFail(user);
      return testEmpty();
    },
  );

  it(
    'users.create() fails given data with more properties than username ' +
    'and passwordHash',
    async () => {
      const newUser = {
        username: 'Carol',
        passwordHash: "Carol's Message",
        moreData: true,
      };

      try {
        await users.create(newUser);
      } catch (err) {
        // tslint:disable-next-line:max-line-length
        expect(err.message).to.equal('Field `moreData` is not in schema and strict mode is set to throw.');
      }
    },
  );

  it(
    'users.read() returns a null result given a non-existent ID',
    async () => {
      const MESSAGE_IDX = 0;
      await users.create(validusers[MESSAGE_IDX]);
      const fakeId = '000000000000000000000000';
      const readResult = await users.readId(fakeId);
      expect(readResult).to.be.null;
    },
  );

  /* 1.5 Security */
  it(
    'users passed to users.create() are sanitized to remove dangerous ' +
    'HTML before being stored',
    async () => {
      const dangerousHTML = '<script>maliciousCode()</script>';
      const MESSAGE_IDX = 0;
      const userName = {
        username: validusers[MESSAGE_IDX].username + dangerousHTML,
        passwordHash: validusers[MESSAGE_IDX].passwordHash,
      };
      const userPassword = {
        username: validusers[MESSAGE_IDX].username,
        passwordHash: validusers[MESSAGE_IDX].passwordHash + dangerousHTML,
      };
      const testCreateSanitized = async (user: IUser) => {
        const createResult = await users.create(user);
        expect(createResult).to.be.an('object');
        expect(createResult).to.have.property('_id');

        const readResult = await users.readId(createResult._id);
        if (readResult == null) return;
        expect(readResult.username).to.equal(validusers[MESSAGE_IDX].username);
        expect(readResult.passwordHash).to.equal(validusers[MESSAGE_IDX].passwordHash);
      };

      return Promise.all([
        testCreateSanitized(userName),
        testCreateSanitized(userPassword),
      ]);
    },
  );

  it(
    'users.read() fails if given data which is not convertible to an ' +
    'ID',
    async () => {
      const MESSAGE_IDX = 0;
      await users.create(validusers[MESSAGE_IDX]);

      const invalidId = { $ne: '' };
      const result = await users.readId(invalidId);
      expect(result).to.not.be.an('object');
    },
  );
});
