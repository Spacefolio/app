import ExpressApp from "../../entrypoint/web/ExpressApp";
import UserRouter from "../../entrypoint/web/routers/UserRouter";
import { IAppConfig } from '..';
import Log4js from 'log4js';
import IntegrationRouter from "../../entrypoint/web/routers/IntegrationRouter";

class WebAppConfiguration {
  static getExpressApp(config: IAppConfig, userRouter: UserRouter, integrationRouter: IntegrationRouter, logger: Log4js.Logger): ExpressApp {
    return new ExpressApp(config, userRouter, integrationRouter, logger);
  }
}

export default WebAppConfiguration;