import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../../types';

export interface IUserModel extends mongoose.Model<IUserDocument> {
	build(attr: IUser): IUserDocument;
}

export interface IUserDocument extends mongoose.Document {
	email: string;
	username?: string;
	hash: string;
	firstName?: string;
	lastName?: string;
	linkedExchanges: string[];
}

const userSchema = new mongoose.Schema({
	email: { type: String, unique: true, required: true },
	username: { type: String, unique: true, required: false },
	hash: { type: String, required: true },
	firstName: { type: String, required: false },
	lastName: { type: String, required: false },
	linkedExchanges: [{ type: Schema.Types.ObjectId, ref: 'ExchangeAccount' }],
	createdDate: { type: Date, default: Date.now },
});

userSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc: IUserDocument, ret: any) {
		delete ret._id;
		delete ret.hash;
	},
});

const UserModel = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
export { UserModel };
