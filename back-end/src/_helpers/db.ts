import mongoose from 'mongoose';
require('dotenv').config();

const connectionOptions = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};

const { MONGO_HOSTNAME, MONGO_DB, MONGO_PORT } = process.env;

const dbConnectionURL = {
	LOCALURL: `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`,
};

mongoose.connect(dbConnectionURL.LOCALURL, connectionOptions);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('DB Connected');
});

