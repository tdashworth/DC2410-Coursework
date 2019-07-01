import * as mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import { pbkdf2Sync, randomBytes } from 'crypto';
import Auth from '../Auth';
import { IUser, UserType, IAuthResponse } from 'dc2410-coursework-common';
import { MongoError } from 'mongodb';

// tslint:disable-next-line:variable-name
export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    displayName: { type: String, required: true },
    type: { type: UserType, required: true },
  },
  { strict: 'throw' },
);

export interface IUserModel extends IUser, mongoose.Document { }

UserSchema.pre('save', async function (this: IUserModel) {
  this.username = sanitizeHtml(this.username);
  this.displayName = sanitizeHtml(this.displayName);
  this.type = this.type || UserType.External;
});

// tslint:disable-next-line:variable-name
const User = mongoose.model<IUserModel>('Users', UserSchema);

export default class Users {
  public static async create(newUser: IUser): Promise<IUserModel | undefined> {
    try {
      const salt = Users.generateSalt();
      const passwordHash = Users.hashPassword(newUser.passwordHash, salt);
      const user = await new User({ ...newUser, passwordHash, salt }).save();
      return user;
    } catch (e) {
      switch ((e as MongoError).code) {
        case 11000:
          throw new Error('Username already exists.');
      }
    }
  }

  public static get(id: string): Promise<IUserModel | null> {
    if (typeof id !== 'string') return Promise.resolve(null);
    return User.findById(id).exec();
  }

  public static async getByUsername(
    username: string,
  ): Promise<IUserModel | null> {
    const users = await User.find({ username }).exec();
    return users.length > 0 ? users[0] : null;
  }

  public static listAll(): Promise<IUserModel[]> {
    return User.find({}).exec();
  }

  public static update(id: any, updatedUser: IUser) {
    if (typeof id !== 'string') return Promise.resolve(null);

    let passwordSet = {};
    if (updatedUser.passwordHash) {
      const salt = Users.generateSalt();
      const passwordHash = updatedUser.passwordHash
        ? Users.hashPassword(updatedUser.passwordHash, salt)
        : {};
      passwordSet = { passwordHash, salt };
    }
    return User.updateOne({ id }, { ...updatedUser, ...passwordSet }).exec();
  }

  public static async login(username: string, password: string): Promise<IAuthResponse> {
    const user = await Users.getByUsername(username);

    if (user === null) throw new Error(`User '${username}' does not exist.`);

    if (user.passwordHash !== Users.hashPassword(password, user.salt!)) {
      throw new Error('Password is incorrect.');
    }

    const { token, expiry } = Auth.generateToken(user as IUser);
    return {
      token,
      user,
      expiry,
    };
  }

  public static hashPassword(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 100000, 512, 'sha512').toString('hex');
  }

  public static generateSalt() {
    return randomBytes(16).toString('hex');
  }

  public static delete(id: any) {
    return User.deleteOne(id).exec();
  }

  public static deleteAll() {
    return User.deleteMany({}).exec();
  }

  public static disconnect() {
    return mongoose.disconnect();
  }
}
