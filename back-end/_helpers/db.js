const config = require("config.json");
const mongoose = require("mongoose");
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
module.exports = {
  User: require("../users/user.model"),
};