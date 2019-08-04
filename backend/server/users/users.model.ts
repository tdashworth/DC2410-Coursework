import { pbkdf2Sync, randomBytes } from 'crypto';
import { IAuthResponse, IUser, UserType } from 'dc2410-coursework-common';
import { MongoError } from 'mongodb';
import * as mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import Auth from '../Auth';

export const UserSchema = new mongoose.Schema(
  {
    displayName: { type: String, required: true },
    id: { type: String, required: false, unique: true },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    type: { type: UserType, required: true },
    username: { type: String, unique: true, required: true },
  },
  { strict: 'throw' },
);

export interface IUserModel extends IUser, mongoose.Document {}

UserSchema.pre('save', async function(this: IUserModel) {
  this.username = sanitizeHtml(this.username);
  this.displayName = sanitizeHtml(this.displayName);
  this.id = this._id;
});

const User = mongoose.model<IUserModel>('Users', UserSchema);

export default class Users {
  /**
   * Creates a user
   * @param newUser an object containing atleast the required data properties.
   * @returns the created user after being saved in the database.
   */
  public static async create(newUser: IUser): Promise<IUserModel | undefined> {
    try {
      const salt = Users.generateSalt();
      const passwordHash = Users.hashPassword(newUser.passwordHash, salt);
      const type = (newUser.type !== null) ? newUser.type : UserType.External;
      const user = await new User({
        ...newUser,
        passwordHash,
        salt,
        type,
      }).save();
      return user;
    } catch (e) {
      switch ((e as MongoError).code) {
        case 11000:
          throw new Error('Username already exists.');
        default:
          throw e;
      }
    }
  }

  /**
   * Gets a user
   * @param id the generate id for the user to return.
   * @returns the user. 
   */
  public static get(id: string): Promise<IUserModel | null> {
    if (typeof id !== 'string') return Promise.resolve(null);
    return User.findById(id).exec();
  }

  /**
   * Gets by username
   * @param username
   * @returns user with given username. 
   */
  public static async getByUsername(
    username: string,
  ): Promise<IUserModel | null> {
    const users = await User.find({ username }).exec();
    return users.length > 0 ? users[0] : null;
  }

  /**
   * Lists all users
   * @returns all users
   */
  public static listAll(): Promise<IUserModel[]> {
    return User.find({}).exec();
  }

  /**
   * Updates users
   * @param id the generate id for the user to update and return.
   * @param updatedUser an object of user properties to update.
   * @returns the updated user.
   */
  public static async update(id: any, updatedUser: IUser) {
    // Get and verify the user exists.
    const user = await Users.get(id);
    if (user === null) throw new Error(`User '${id}' does not exist.`);

    let passwordSet = {};
    if (updatedUser.passwordHash) {
      const salt = Users.generateSalt();
      const passwordHash = updatedUser.passwordHash
        ? Users.hashPassword(updatedUser.passwordHash, salt)
        : {};
      passwordSet = { passwordHash, salt };
    }
    return User.updateOne(
      { id },
      { user, ...updatedUser, ...passwordSet },
    ).exec();
  }

  /**
   * Validate a user's logins
   * @param username
   * @param password
   * @returns expiry,token, and user.
   */
  public static async login(
    username: string,
    password: string,
  ): Promise<IAuthResponse> {
    // Get and verify the user exists.
    const user = await Users.getByUsername(username);
    if (user === null) throw new Error(`User '${username}' does not exist.`);

    // Verify login details.
    if (user.passwordHash !== Users.hashPassword(password, user.salt!)) {
      throw new Error('Password is incorrect.');
    }

    // Generate token for local client storage.
    const { token, expiry } = Auth.generateToken(user as IUser);
    return { expiry, token, user };
  }

  /**
   * Hashs the given password with salt
   * @param password the plain text password.
   * @param salt the random salt value.
   * @returns  the hashed password for secure storage.
   */
  public static hashPassword(password: string, salt: string) {
    if (typeof password !== 'string') {
      throw new Error('Users validation failed: password required as string.');
    }
    return pbkdf2Sync(password, salt, 100000, 512, 'sha512').toString('hex');
  }

  /**
   * Generates salt a 'random' salt value
   * @returns the salt value.
   */
  public static generateSalt() {
    return randomBytes(16).toString('hex');
  }

  /**
   * Deletes a user
   * @param id the generate id for the user to delete.
   * @returns
   */
  public static delete(id: any) {
    return User.deleteOne(id).exec();
  }

  /**
   * Deletes all users
   * @returns
   */
  public static deleteAll() {
    return User.deleteMany({}).exec();
  }
}
