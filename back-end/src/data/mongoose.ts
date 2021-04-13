import { Logger } from 'log4js';
import mongoose, { Connection } from 'mongoose';
import { IAppConfig } from '../config';

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

const connectMongoose = (config: IAppConfig, logger: Logger): Promise<Connection> => {
  const uri: string = config.db.uri;

  if (config.env.dev) {
    mongoose.set('debug', true);
  }

  // set mongoose Promise to Bluebird
  mongoose.Promise = Promise;

  // Exit application on error
  mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`);
  });

  mongoose.connect(uri, connectionOptions);

  return new Promise((resolve) => {
    mongoose.connection.on('connected', () => {
      logger.info(`Mongoose default connection is open to ${uri}`);
      resolve(mongoose.connection);
    });
  });
}

export default connectMongoose;