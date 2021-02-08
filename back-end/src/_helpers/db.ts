import * as config from "../../config.json";
import mongoose from "mongoose";
import { User } from '../users/user.model';
import { ExchangeAccount } from '../exchanges/exchange.model';
require("dotenv").config();

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions, () => {});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("DB Connected");
});
mongoose.Promise = global.Promise;

export {
  User,
  ExchangeAccount
}