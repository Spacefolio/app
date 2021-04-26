import config from "../../../src/config";
import { UserUseCasesConfiguration } from "../../../src/config/core";
import { DatabaseConfiguration } from "../../../src/config/data";
import { ControllersConfiguration, LoggerConfiguration, RouterConfiguration, WebAppConfiguration } from "../../../src/config/entrypoint";
import IUserEntityGateway from "../../../src/core/use-cases/user/UserEntityGateway";

export class TestServer {
  public constructor(public userDatabase: IUserEntityGateway) {}

  public static async createTestServer(): Promise<TestServer> {

    const logger = LoggerConfiguration.getLogger(config);

	  const userDatabase = DatabaseConfiguration.getUserInMemoryDatabase();
	
    const authenticateUserUseCase = UserUseCasesConfiguration.getAuthenticateUserUseCase(userDatabase);
    const registerUserUseCase = UserUseCasesConfiguration.getRegisterUserUseCase(userDatabase);

    const authenticateUserController = ControllersConfiguration.getAuthenticateUserController(authenticateUserUseCase);
    const registerUserController = ControllersConfiguration.getRegisterUserController(registerUserUseCase);

    const userRouter = RouterConfiguration.getUserRouter(authenticateUserController, registerUserController);
    const expressApp = WebAppConfiguration.getExpressApp(config, userRouter, logger);

    expressApp.boot();

    const testServer = new TestServer(userDatabase);
    return testServer;
  }

  public async clearDb(): Promise<void> {
    await this.userDatabase.clearUsers();
  }

  public async closeDb(): Promise<void> { await this.clearDb(); }
}