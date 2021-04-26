import { Schema } from "mongoose";
import mongoose from 'mongoose';
import { IExchangeAccountDao } from "../integration/exchangeAccount/ExchangeAccountModel";

export interface IUserDao
{
	email: string;
	username?: string;
	password: string;
	firstName?: string;
	lastName?: string;
	exchangeAccounts?: string[] | IExchangeAccountDao[];
}

export interface IUserDocument extends IUserDao, mongoose.Document {}

const UserSchema = new mongoose.Schema({
	email: { type: String, unique: true, required: true },
	username: { type: String, unique: true, required: false },
	password: { type: String, required: true },
	firstName: { type: String, required: false },
	lastName: { type: String, required: false },
	exchangeAccounts: [{ type: Schema.Types.ObjectId, ref: 'ExchangeAccount' }],
}, {
	timestamps: true
});

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
export default UserModel;