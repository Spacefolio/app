import config from "../../../src/config";
import { ExchangeAccountUseCasesConfiguration, UserUseCasesConfiguration } from "../../../src/config/core";
import { DatabaseConfiguration } from "../../../src/config/data";
import { ControllersConfiguration, LoggerConfiguration, RouterConfiguration, WebAppConfiguration } from "../../../src/config/entrypoint";
import IUserEntityGateway from "../../../src/core/use-cases/user/UserEntityGateway";

export class TestServer {
  public constructor(public userDatabase: IUserEntityGateway) {}

  public static async createTestServer(): Promise<TestServer> {

    const logger = LoggerConfiguration.getLogger(config);

	  const userDatabase = DatabaseConfiguration.getUserInMemoryDatabase();
    const exchangeAccountDatabase = DatabaseConfiguration.getExchangeAccountInMemoryDatabase();
	
    const authenticateUserUseCase = UserUseCasesConfiguration.getAuthenticateUserUseCase(userDatabase);
    const authenticateUserController = ControllersConfiguration.getAuthenticateUserController(authenticateUserUseCase);
    const registerUserUseCase = UserUseCasesConfiguration.getRegisterUserUseCase(userDatabase);    
    const registerUserController = ControllersConfiguration.getRegisterUserController(registerUserUseCase);

    const userRouter = RouterConfiguration.getUserRouter(authenticateUserController, registerUserController);
    
    const addExchangeAccountUseCase = ExchangeAccountUseCasesConfiguration.getAddExchangeAccountUseCase(userDatabase, exchangeAccountDatabase);
    const addExchangeAccountController = ControllersConfiguration.getAddExchangeAccountController(addExchangeAccountUseCase);
    const removeExchangeAccountUseCase = ExchangeAccountUseCasesConfiguration.getRemoveExchangeAccountUseCase(userDatabase, exchangeAccountDatabase);
    const removeExchangeAccountController = ControllersConfiguration.getRemoveExchangeAccountController(removeExchangeAccountUseCase);
    
    const exchangeAccountRouter = RouterConfiguration.getExchangeAccountRouter(addExchangeAccountController, removeExchangeAccountController);
    const integrationRouter = RouterConfiguration.getIntegrationRouter(exchangeAccountRouter);

    const expressApp = WebAppConfiguration.getExpressApp(config, userRouter, integrationRouter, logger);

    expressApp.boot();

    const testServer = new TestServer(userDatabase);
    return testServer;
  }

  public async clearDb(): Promise<void> {
    await this.userDatabase.clearUsers();
  }

  public async closeDb(): Promise<void> { await this.clearDb(); }
}