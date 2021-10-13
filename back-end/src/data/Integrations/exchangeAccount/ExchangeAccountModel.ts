import mongoose from 'mongoose';
import { Exchange } from '../../../core/entities/Integrations';
import { holdingSchema, IHoldingDao } from '../Holding';
import { IOrderDao, orderSchema } from '../Order';
import { ITimeslicesDao } from '../Timeslice';
import { digitalAssetTransactionSchema, IDigitalAssetTransactionDao } from '../Transaction';

export interface IExchangeAccountDao
{
  name: string,
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
  orders: IOrderDao[],
  openOrders: IOrderDao[],
  transactions: IDigitalAssetTransactionDao[];
  dailyTimeslices: ITimeslicesDao;
  hourlyTimeslices: ITimeslicesDao;
  lastSynced: Date;
}

export interface IExchangeAccountDocument extends IExchangeAccountDao, mongoose.Document {}

const ExchangeAccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
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
  orders: [orderSchema],
  openOrders: [orderSchema],
  holdings: [holdingSchema],
  transactions: [digitalAssetTransactionSchema],
  dailyTimeslices: { type: Object },
  hourlyTimeslices: { type: Object },
  lastSynced: { type: Date, default: 0 }
}, { timestamps: true });

const ExchangeAccountModel = mongoose.model<IExchangeAccountDocument>('ExchangeAccount', ExchangeAccountSchema);
export default ExchangeAccountModel;