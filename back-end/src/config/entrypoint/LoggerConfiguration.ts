import Log4js from 'log4js';
import { IAppConfig } from '..';

class LoggerConfiguration
{
  static getLogger(config: IAppConfig): Log4js.Logger {
    Log4js.configure(config.logging);
    const logger = Log4js.getLogger();
    logger.level = 'debug';
    return logger;
  }
}

export default LoggerConfiguration;