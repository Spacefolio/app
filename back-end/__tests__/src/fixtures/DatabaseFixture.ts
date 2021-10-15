import mongoose, { Connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { IAppConfig } from '../../../src/config';
import { Logger } from 'log4js';

const mongod = new MongoMemoryServer();

const connectMongo = async (config: IAppConfig, logger: Logger): Promise<Connection> => {
  const uri = await mongod.getUri();

  if (config.env.dev) {
    mongoose.set('debug', false);
  }

  // set mongoose Promise to Bluebird
  mongoose.Promise = Promise;

  // Exit application on error
  mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`);
  });

  mongoose.connect(uri);

  return new Promise((resolve) => {
    mongoose.connection.on('connected', () => {
      logger.info(`Mongoose default connection is open to ${uri}`);
      resolve(mongoose.connection);
    });
  });
}

const clearMongo = async (): Promise<void> => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}

const closeMongo = async (): Promise<void> => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

export { connectMongo, closeMongo, clearMongo };
