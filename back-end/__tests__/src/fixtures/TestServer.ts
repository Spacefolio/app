import { Server } from 'node:http';
import config from '../../../src/config';
import { ExchangeAccountUseCasesConfiguration, UserUseCasesConfiguration } from '../../../src/config/core';
import { DatabaseConfiguration } from '../../../src/config/data';
import { ControllersConfiguration, LoggerConfiguration, RouterConfiguration, WebAppConfiguration } from '../../../src/config/entrypoint';
import { IExchangeAccountEntityGateway } from '../../../src/core/use-cases/integration/exchangeAccount';
import IUserEntityGateway from '../../../src/core/use-cases/user/UserEntityGateway';

export class TestServer {

	private constructor(public userDatabase: IUserEntityGateway, public exchangeAccountDatabase: IExchangeAccountEntityGateway, public server: Server) {}

	public static createTestServer(): TestServer {
		const logger = LoggerConfiguration.getLogger(config);

		const userDatabase = DatabaseConfiguration.getUserInMemoryDatabase();
		const exchangeAccountDatabase = DatabaseConfiguration.getExchangeAccountInMemoryDatabase();

		const authenticateUserUseCase = UserUseCasesConfiguration.getAuthenticateUserUseCase(userDatabase);
		const authenticateUserController = ControllersConfiguration.getAuthenticateUserController(authenticateUserUseCase);
		const registerUserUseCase = UserUseCasesConfiguration.getRegisterUserUseCase(userDatabase);
		const registerUserController = ControllersConfiguration.getRegisterUserController(registerUserUseCase);

		const userRouter = RouterConfiguration.getUserRouter(authenticateUserController, registerUserController);

		const addExchangeAccountUseCase = ExchangeAccountUseCasesConfiguration.getAddExchangeAccountUseCase(
			userDatabase,
			exchangeAccountDatabase
		);
		const addExchangeAccountController = ControllersConfiguration.getAddExchangeAccountController(addExchangeAccountUseCase);
		const removeExchangeAccountUseCase = ExchangeAccountUseCasesConfiguration.getRemoveExchangeAccountUseCase(
			userDatabase,
			exchangeAccountDatabase
		);
		const removeExchangeAccountController = ControllersConfiguration.getRemoveExchangeAccountController(removeExchangeAccountUseCase);
		const getExchangeAccountUseCase = ExchangeAccountUseCasesConfiguration.getGetExchangeAccountUseCase(
			userDatabase,
			exchangeAccountDatabase
		);
		const getExchangeAccountController = ControllersConfiguration.getGetExchangeAccountController(getExchangeAccountUseCase);
		const getAllExchangeAccountsUseCase = ExchangeAccountUseCasesConfiguration.getGetAllExchangeAccountsUseCase(
			userDatabase,
			exchangeAccountDatabase
		);
		const getAllExchangeAccountsController = ControllersConfiguration.getGetAllExchangeAccountsController(getAllExchangeAccountsUseCase);

		const exchangeAccountRouter = RouterConfiguration.getExchangeAccountRouter(
			addExchangeAccountController,
			removeExchangeAccountController,
			getExchangeAccountController,
			getAllExchangeAccountsController
		);
		const integrationRouter = RouterConfiguration.getIntegrationRouter(exchangeAccountRouter);

		const expressApp = WebAppConfiguration.getExpressApp(config, userRouter, integrationRouter, logger);

		const server = expressApp.boot();

		const testServer = new TestServer(userDatabase, exchangeAccountDatabase, server);
		return testServer;
	}

	public async clearDb(): Promise<void> {
		await this.userDatabase.clearUsers();
		await this.exchangeAccountDatabase.clearExchangeAccounts();
	}

	public async close(): Promise<void> {
		await this.clearDb();
		this.server.close(() => { return; });
	}
}

const testServer = TestServer.createTestServer();
export { testServer }