import mongoose from 'mongoose';
import { IExchangeAccount } from '../../../types';

export interface IExchangeAccountDocument extends mongoose.Document {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
    name: string;
    nickname: string;
    exchangeType: string;
    addedDate: Date;
}

export interface IExchangeAccountModel extends mongoose.Model<IExchangeAccountDocument> {
    build(attr: IExchangeAccount): IExchangeAccountDocument
}

const exchangeAccountSchema = new mongoose.Schema({
    apiKey: { type: String, required: true },
    apiSecret: { type: String, required: true },
    passphrase: { type: String, required: false },
    name: { type: String, required: true },
    nickname: { type: String },
    exchangeType: { type: String, required: true },
    addedDate: { type: Date, default: Date.now }
});

exchangeAccountSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

const ExchangeAccount = mongoose.model<IExchangeAccountDocument, IExchangeAccountModel>('ExchangeAccount', exchangeAccountSchema);
export { ExchangeAccount }