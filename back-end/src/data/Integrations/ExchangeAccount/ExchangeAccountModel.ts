import mongoose from 'mongoose';
import { Exchange } from '../../../core/entities/Integrations';
import { holdingSchema, IHoldingDao } from '../Holding';
import { IOrderDao, orderSchema } from '../Order';
import { ITimeslicesDao, timesliceSchema } from '../Timeslice';
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
    secret?: string;
    password?: string;
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
  createdAt: Date;
}

export interface IExchangeAccountDocument extends IExchangeAccountDao, mongoose.Document {}

const ExchangeAccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  accountId: { type: String, unique: true, required: true },
	exchange: { type: String, enum: Exchange, required: true },
  nickname: { type: String, required: true },
  credentials: { 
    type: {
      apiKey: { type: String, required: false },
      secret:  { type: String, required: false },
      password: { type: String, required: false },
      uid: { type: String, required: false },
      login: { type: String, required: false },
      twofa: { type: String, required: false },
      privateKey: { type: String, required: false },
      walletAddress: { type: String, required: false },
      token: { type: String, required: false },
    }, required: true 
  },
  orders: [orderSchema],
  openOrders: [orderSchema],
  holdings: [holdingSchema],
  transactions: [digitalAssetTransactionSchema],
  dailyTimeslices: { type: mongoose.Schema.Types.Map, of: timesliceSchema },
  hourlyTimeslices: { type: mongoose.Schema.Types.Map, of: timesliceSchema },
  lastSynced: { type: Date, default: 0 },
  createdAt: { type: Date, default: new Date() }
}, { timestamps: true });

const ExchangeAccountModel = mongoose.model<IExchangeAccountDocument>('ExchangeAccount', ExchangeAccountSchema);
export default ExchangeAccountModel;