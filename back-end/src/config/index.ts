import * as dotenv from "dotenv";
import assert from 'assert';
import path from 'path';
import { Configuration } from 'log4js';

dotenv.config();

interface IAppConfig
{
  env: {
    dev: boolean,
    prod: boolean
  },
  port: number,
  secret: string,
  db: {
    uri: string
  },
  logging: Configuration
}

const ENV_IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PORT = ENV_IS_PRODUCTION ? (process.env.PORT ? parseInt(process.env.PORT) : 80) : 4000;

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'botsea';
const DB_DIALECT = process.env.DB_DIALECT || 'mongodb';
const DB_USERNAME = process.env.DB_USERNAME || undefined;
const DB_PASSWORD = process.env.DB_PASSWORD || undefined;
const DB_URI: string = (DB_USERNAME && DB_PASSWORD) ? 
`${DB_DIALECT}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}` :
`${DB_DIALECT}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
assert(process.env.ACCESS_TOKEN_SECRET);
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const environmentName = ENV_IS_PRODUCTION ? 'production' : 'development';
const logPath = path.join(__dirname, `../logs/${environmentName}.log`);

const config: IAppConfig = {
  env: {
    dev: !ENV_IS_PRODUCTION,
    prod: ENV_IS_PRODUCTION
  },
  port: PORT,
  secret: ACCESS_TOKEN_SECRET,
  db: {
    uri: DB_URI
  },
  logging: {
    appenders: { cheese: { type: 'file', filename: logPath } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
  }
};

export default config;
export { IAppConfig }