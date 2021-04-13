import ExpressApp from "../../entrypoint/web/ExpressApp";
import UserRouter from "../../entrypoint/web/routers/UserRouter";
import { IAppConfig } from '..';
import Log4js from 'log4js';

class WebAppConfiguration {
  static getExpressApp(config: IAppConfig, userRouter: UserRouter, logger: Log4js.Logger): ExpressApp {
    return new ExpressApp(config, userRouter, logger);
  }
}

export default WebAppConfiguration;