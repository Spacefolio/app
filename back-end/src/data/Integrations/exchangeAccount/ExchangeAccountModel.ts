import mongoose from 'mongoose';
import { Exchange } from '../../../core/entities/Integrations';
import { holdingSchema, IHoldingDao } from '../Holding';
import { digitalAssetTransactionSchema, IDigitalAssetTransactionDao } from '../Transaction';

export interface IExchangeAccountDao
{
  accountId: string,
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
  },
  holdings: IHoldingDao[],
  transactions: IDigitalAssetTransactionDao[];
}

export interface IExchangeAccountDocument extends IExchangeAccountDao, mongoose.Document {}

const ExchangeAccountSchema = new mongoose.Schema({
  accountId: { type: String, unique: true, required: true },
	exchange: { type: String, enum: Exchange, required: true },
  nickname: { type: String, required: true },
  credentials: { 
    type: {
      apiKey: String,
      apiSecret: String,
      passphrase: String,
      uid: String,
      login: String,
      twofa: String,
      privateKey: String,
      walletAddress: String,
      token: String,
    }, required: true 
  },
  holdings: [holdingSchema],
  transactions: [digitalAssetTransactionSchema]
}, { timestamps: true });

const ExchangeAccountModel = mongoose.model<IExchangeAccountDocument>('ExchangeAccount', ExchangeAccountSchema);
export default ExchangeAccountModel;