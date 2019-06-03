import mongoose, { Schema } from 'mongoose';
import sanitizeHtml from 'sanitize-html';

export interface IUser {
  username: string;
  passwordHash: string;
}

// tslint:disable-next-line:variable-name
export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { strict: 'throw' },
);

UserSchema.pre('save', async function (this: IUserModel) {
  this.username = sanitizeHtml(this.username);
  this.passwordHash = sanitizeHtml(this.passwordHash);
});

export interface IUserModel extends IUser, mongoose.Document { }
// tslint:disable-next-line:variable-name
let User: mongoose.Model<IUserModel, {}>;

export default class Users {
  async conect(url: string) {
    await mongoose.connect(
      url, {
        useNewUrlParser: true,
        useFindAndModify: false,
      },
    );
    User = mongoose.model<IUserModel>('User', UserSchema);
  }

  create(newUser: IUser): Promise<IUserModel> {
    return new User(newUser).save();
  }

  readId(id: any): Promise<IUserModel | null> {
    if (typeof id !== 'number') return Promise.resolve(null);
    return User.findById(id).exec();
  }

  readAll(): Promise<IUserModel[]> {
    return User.find({}).exec();
  }

  update(id: any, updatedUser: IUser) {
    return User.findOneAndUpdate(id, updatedUser).exec();
  }

  delete(id: any) {
    return User.findByIdAndDelete(id).exec();
  }

  deleteAll() {
    return User.deleteMany({}).exec();
  }

  disconnect() {
    return mongoose.disconnect();
  }
}
