import { Application, default as express } from "express";
import { IAppConfig } from "../../config";
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import jwt from 'express-jwt';
import { Logger } from "log4js";
import UserRouter from "./routers/UserRouter";
import IntegrationRouter from './routers/IntegrationRouter';
import { Server } from "node:http";
import PortfolioRouter from "./routers/PortfolioRouter";

class ExpressApp {
  app: Application;
  config: IAppConfig;
  userRouter: UserRouter;
  integrationRouter: IntegrationRouter;
  portfolioRouter: PortfolioRouter;
  logger: Logger;

  constructor(config: IAppConfig, userRouter: UserRouter, integrationRouter: IntegrationRouter, portfolioRouter: PortfolioRouter, logger: Logger) {
    this.app = express();
    this.config = config;
    this.userRouter = userRouter;
    this.integrationRouter = integrationRouter;
    this.portfolioRouter = portfolioRouter;
    this.logger = logger;
  }

  private configApp(): void {
    const app = this.app;
    
    app.use(urlencoded({ extended: false }));
    app.use(json());
    app.use(cors());
    app.disable('x-powered-by');
    app.use(jwt({ secret: this.config.secret, algorithms: ['HS256']})
      .unless({ path: ['/users/authenticate', '/users/register', '/users/registration-check']}));
      
    app.use('/users', this.userRouter.getRouter());
    app.use('/integrations', this.integrationRouter.getRouter());
    app.use('/portfolio', this.portfolioRouter.getRouter());
  }

  boot(): Server {
    if (!this.app) {
      this.app = express();
    }

    this.configApp();

    const http = this.app
      .listen(this.config.port, '127.0.0.1', () => {
        this.logger.info(http.address());
        this.logger.info(`[p ${process.pid}] Listening at port ${this.config.port}`);
        console.debug(`Listening at port ${this.config.port}`);
      });

    return http;
  }
}

export default ExpressApp;