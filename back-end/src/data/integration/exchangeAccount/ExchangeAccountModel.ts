import { Schema } from "mongoose";
import mongoose from 'mongoose';
import { Exchange } from "../../../config/core/Exchanges";

export interface IExchangeAccountDao
{
  owner: string;
	exchange: Exchange,
  nickname: string,
  credentials: 
  {
    apiKey?: string;
    apiSecret?: string;
    passphrase?: string;
    uid?: string;
    login?: string;
    twofa?: string;
    privateKey?: string;
    walletAddress?: string;
    token?: string;
  }
}

export interface IExchangeAccountDocument extends IExchangeAccountDao, mongoose.Document {}

const ExchangeAccountSchema = new mongoose.Schema({
	owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	exchange: { type: String, enum: Exchange, required: true },
  nickname: { type: String, required: true },
  credentials: {
    apiKey: String,
    apiSecret: String,
    passphrase: String,
    uid: String,
    login: String,
    twofa: String,
    privateKey: String,
    walletAddress: String,
    token: String,
    required: true
  }
}, {
	timestamps: true
});

const ExchangeAccountModel = mongoose.model<IExchangeAccountDocument>('ExchangeAccount', ExchangeAccountSchema);
export default ExchangeAccountModel;