import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import { ObjectId } from 'mongodb';

export enum UserType {
  Internal,
  External,
}

export interface IUser {
  username: string;
  passwordHash: string;
  displayName: string;
  type?: UserType;
}

// tslint:disable-next-line:variable-name
export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    displayName: { type: String, required: true },
    type: { type: String, required: false },
  },
  { strict: 'throw' },
);

export interface IUserModel extends IUser, mongoose.Document { }

UserSchema.pre('save', async function (this: IUserModel) {
  this.username = sanitizeHtml(this.username);
  this.passwordHash = sanitizeHtml(this.passwordHash);
  this.displayName = sanitizeHtml(this.displayName);
  this.type = this.type || UserType.External;
});

// tslint:disable-next-line:variable-name
let User: mongoose.Model<IUserModel, {}>;
User = mongoose.model<IUserModel>('User', UserSchema);

export default class Users {

  static create(newUser: IUser): Promise<IUserModel> {
    return new User(newUser).save();
  }

  static get(id: any): Promise<IUserModel | null> {
    if (!(id instanceof ObjectId)) return Promise.resolve(null);
    return User.findById(id).exec();
  }

  static async validateLogin(username: string, passwordHash: string): Promise<IUserModel | null> {
    const users = await User.find({ username, passwordHash }).exec();
    return users.length > 0 ? users[0] : null;
  }

  static listAll(): Promise<IUserModel[]> {
    return User.find({}).exec();
  }

  static update(id: any, updatedUser: IUser) {
    return User.findOneAndUpdate(id, updatedUser).exec();
  }

  static delete(id: any) {
    return User.findByIdAndDelete(id).exec();
  }

  static deleteAll() {
    return User.deleteMany({}).exec();
  }

  static disconnect() {
    return mongoose.disconnect();
  }
}
