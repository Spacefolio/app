const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    apiKey: { type: String, required: true },
    apiSecret: { type: String, required: true },
    passphrase: { type: String, required: true },
    name: { type: String, required: true },
    nickname: { type: String },
    exchangeType: { type: Number, required: true },
    addedDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Exchange', schema);