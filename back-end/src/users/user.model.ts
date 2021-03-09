import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../../types';

export interface IUserModel extends mongoose.Model<IUserDocument> {
    build(attr: IUser): IUserDocument
}

export interface IUserDocument extends mongoose.Document {
    username: string;
    hash: string;
    firstName: string;
    lastName: string;
    linkedExchanges: string[];
}

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    linkedExchanges: [ { type: Schema.Types.ObjectId, ref: 'ExchangeAccount' } ],
    createdDate: { type: Date, default: Date.now }
});

userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc: IUserDocument, ret: any) {
      delete ret._id;
      delete ret.hash;
    },
});

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
export { User }