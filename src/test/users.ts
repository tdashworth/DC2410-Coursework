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

  before(async () => {
    users = new Users();
    await users.conect(config.db.url);
  });

  beforeEach(async () => {
    return users.deleteAll();
  });

  after(async () => {
    return users.disconnect();
  });

  it(
    'users.create() can create a user given data with username, passwordHash and' +
    ' displayName properties. It returns a copy of the message with matching username,' +
    ' passwordHash and displayName properties and an _id property.',
    async () => {
      const user = {
        username: 'alice',
        passwordHash: 'Password1',
        displayName: 'Alice',
      };

      const result = await users.create(user);

      expect(result).to.be.an('object');
      if (result == null) return;
      expect(result).to.have.property('username');
      expect(result.username).to.equal(user.username);
      expect(result).to.have.property('passwordHash');
      expect(result.passwordHash).to.equal(user.passwordHash);
      expect(result).to.have.property('displayName');
      expect(result.displayName).to.equal(user.displayName);
      expect(result).to.have.property('_id');
    },
  );

  it(
    'users.get() reads a single user created by users.create() ' +
    'using the _id property returned by the latter.',
    async () => {
      const user = {
        username: 'alice',
        passwordHash: 'Password1',
        displayName: 'Alice',
      };
      const createResult = await users.create(user);

      const readResult = await users.get(createResult._id);

      if (readResult == null) return;
      expect(readResult).to.have.property('username');
      expect(readResult.username).to.equal(user.username);
      expect(readResult).to.have.property('passwordHash');
      expect(readResult.passwordHash).to.equal(user.passwordHash);
      expect(readResult).to.have.property('displayName');
      expect(readResult.displayName).to.equal(user.displayName);
    },
  );

  it(
    'users.create() fails to create users given data which is missing ' +
    'username and/or passwordHash properties.',
    () => {
      const emptyMessage = {};
      const usernameMessage = { username: 'carol' };
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
      const testCreateFail = async (user: any) => {
        await users.create(user)
          .catch(err => expect(err.message).to.contain('User validation failed:'));
      };

      await testCreateFail({
        username: { prop: 'val' },
        passwordHash: 'Password10',
        displayName: 'Tom',
      });
      await testCreateFail({
        username: 'carol',
        passwordHash: { prop: 'val' },
        displayName: 'Carol',
      });
      await testCreateFail({
        username: 'Carol',
        passwordHash: 'Password10',
        displayName: { prop: 'val' },
      });

      const result = await users.listAll();
      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    },
  );

  it(
    'users.create() fails given data with more properties than username, ' +
    'passwordHash and displayName',
    async () => {
      const newUser = {
        username: 'carol',
        passwordHash: 'password5',
        displayName: 'Carol',
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
    'users.get() returns a null result given a non-existent ID',
    async () => {
      const user = {
        username: 'bob',
        passwordHash: 'Password2',
        displayName: 'Bob',
      };
      await users.create(user);
      const fakeId = '000000000000000000000000';

      const readResult = await users.get(fakeId);

      expect(readResult).to.be.null;
    },
  );

  /* 1.5 Security */
  it(
    'users passed to users.create() are sanitized to remove dangerous ' +
    'HTML before being stored',
    async () => {
      const dangerousHTML = '<script>maliciousCode()</script>';
      const user = {
        username: 'bob',
        passwordHash: 'Password2',
        displayName: 'Bob',
      };

      const testCreateSanitized = async (user: IUser) => {
        const createResult = await users.create(user);
        expect(createResult).to.be.an('object');
        expect(createResult).to.have.property('_id');

        const readResult = await users.get(createResult._id);
        if (readResult == null) return;
        expect(readResult.username).to.equal(user.username);
        expect(readResult.passwordHash).to.equal(user.passwordHash);
        expect(readResult.displayName).to.equal(user.displayName);
      };

      return Promise.all([
        testCreateSanitized({
          username: user.username + dangerousHTML,
          passwordHash: user.passwordHash,
          displayName: user.displayName,
        }),
        testCreateSanitized({
          username: user.username,
          passwordHash: user.passwordHash + dangerousHTML,
          displayName: user.displayName,
        }),
        testCreateSanitized({
          username: user.username,
          passwordHash: user.passwordHash,
          displayName: user.displayName + dangerousHTML,
        }),
      ]);
    },
  );

  it(
    'users.get() fails if given data which is not convertible to an ' +
    'ID',
    async () => {
      const user = {
        username: 'alice',
        passwordHash: 'Password1',
        displayName: 'Alice',
      };
      await users.create(user);

      const invalidId = { $ne: '' };
      const result = await users.get(invalidId);
      expect(result).to.not.be.an('object');
    },
  );
});
