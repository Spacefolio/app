import ExpressApp from "../../entrypoint/web/ExpressApp";
import UserRouter from "../../entrypoint/web/routers/UserRouter";
import { IAppConfig } from '..';
import Log4js from 'log4js';
import IntegrationRouter from "../../entrypoint/web/routers/IntegrationRouter";
import PortfolioRouter from "../../entrypoint/web/routers/PortfolioRouter";

class WebAppConfiguration {
  static getExpressApp(config: IAppConfig, userRouter: UserRouter, integrationRouter: IntegrationRouter, portfolioRouter: PortfolioRouter, logger: Log4js.Logger): ExpressApp {
    return new ExpressApp(config, userRouter, integrationRouter, portfolioRouter, logger);
  }
}

export default WebAppConfiguration;