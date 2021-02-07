import mongoose from 'mongoose';

export interface IExchangeAccount {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
    name: string;
    nickname: string;
    exchangeType: number;
    addedDate: Date;
}

export interface IExchangeAccountRequest {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
    name: string;
    nickname?: string;
    exchangeType: number;
}

export interface IExchangeAccountDocument extends mongoose.Document {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
    name: string;
    nickname: string;
    exchangeType: number;
    addedDate: Date;
}

export interface IExchangeAccountModel extends mongoose.Model<IExchangeAccountDocument> {
    build(attr: IExchangeAccount): IExchangeAccountDocument
}

const exchangeAccountSchema = new mongoose.Schema({
    apiKey: { type: String, required: true },
    apiSecret: { type: String, required: true },
    passphrase: { type: String, required: true },
    name: { type: String, required: true },
    nickname: { type: String },
    exchangeType: { type: Number, required: true },
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