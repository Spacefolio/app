require("rootpath")();
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
import jwt from "./_helpers/jwt";
import { errorHandler } from "./_helpers/error-handler";
import { usersRouter } from "./users/users.controller";
import { exchangesRouter } from "./exchanges/exchanges.controller";
import { portfolioRouter } from "./portfolios/portfolios.controller";
import { transactionsRouter } from "./transactions/transactions.controller";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", usersRouter);
app.use("/exchanges", exchangesRouter);
app.use("/portfolios", portfolioRouter);

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
