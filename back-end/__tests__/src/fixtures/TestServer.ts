import { Logger } from 'log4js';
import { Server } from 'node:http';
import config, { IAppConfig } from '../../../src/config';
import { ExchangeAccountUseCasesConfiguration, UserUseCasesConfiguration } from '../../../src/config/core';
import { ExchangesConfiguration } from '../../../src/config/core/Exchanges';
import { DatabaseConfiguration } from '../../../src/config/data';
import { ControllersConfiguration, LoggerConfiguration, RouterConfiguration, WebAppConfiguration } from '../../../src/config/entrypoint';
import { IExchangeAccountEntityGateway } from '../../../src/core/use-cases/integration/exchangeAccount';
import IUserEntityGateway from '../../../src/core/use-cases/user/UserEntityGateway';
import { verifyCredentials } from './ExchangeInteractionFixture';

export class TestServer {
	private constructor(
		public userDatabase: IUserEntityGateway,
		public exchangeAccountDatabase: IExchangeAccountEntityGateway,
		public server: Server,
		public config: IAppConfig,
		public logger: Logger
	) {}

	public static createTestServer(): TestServer {
		const logger = LoggerConfiguration.getLogger(config);

		const userDatabase = DatabaseConfiguration.getUserMongoDatabase();
		const exchangeAccountDatabase = DatabaseConfiguration.getExchangeAccountMongoDatabase();
		const digitalAssetDatabase = DatabaseConfiguration.getDigitalAssetInMemoryDatabase();
		const digitalAssetHistoryDatabase = DatabaseConfiguration.getDigitalAssetHistoryInMemoryDatabase();

		const authenticateUserUseCase = UserUseCasesConfiguration.getAuthenticateUserUseCase(userDatabase);
		const authenticateUserController = ControllersConfiguration.getAuthenticateUserController(authenticateUserUseCase);
		const registerUserUseCase = UserUseCasesConfiguration.getRegisterUserUseCase(userDatabase);
		const registerUserController = ControllersConfiguration.getRegisterUserController(registerUserUseCase);
		const checkRegistrationUseCase = UserUseCasesConfiguration.getCheckRegistrationUseCase(userDatabase);
		const checkRegistrationController = ControllersConfiguration.getCheckRegistrationController(checkRegistrationUseCase);

		const userRouter = RouterConfiguration.getUserRouter(authenticateUserController, registerUserController, checkRegistrationController);

		const addExchangeAccountUseCase = ExchangeAccountUseCasesConfiguration.getAddExchangeAccountUseCase(
			userDatabase,
			exchangeAccountDatabase,
			verifyCredentials
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

		const getHoldingsUseCase = ExchangeAccountUseCasesConfiguration.getGetHoldingsUseCase(userDatabase, exchangeAccountDatabase);
		const getHoldingsController = ControllersConfiguration.getGetHoldingsController(getHoldingsUseCase);

		const getTransactionsUseCase = ExchangeAccountUseCasesConfiguration.getGetTransactionsUseCase(userDatabase, exchangeAccountDatabase);
		const getTransactionsController = ControllersConfiguration.getGetTransactionsController(getTransactionsUseCase);

		const syncExchangeAccountUseCase = ExchangeAccountUseCasesConfiguration.getSyncExchangeAccountUseCase(userDatabase, exchangeAccountDatabase, digitalAssetDatabase, digitalAssetHistoryDatabase, ExchangesConfiguration.get);
		const syncExchangeAccountController = ControllersConfiguration.getSyncExchangeAccountController(syncExchangeAccountUseCase);

		const syncExchangeAccountsUseCase = ExchangeAccountUseCasesConfiguration.getSyncExchangeAccountsUseCase(userDatabase, exchangeAccountDatabase, digitalAssetDatabase, digitalAssetHistoryDatabase, ExchangesConfiguration.get);
		const syncExchangeAccountsController = ControllersConfiguration.getSyncExchangeAccountsController(syncExchangeAccountsUseCase);

		const exchangeAccountRouter = RouterConfiguration.getExchangeAccountRouter(
			addExchangeAccountController,
			removeExchangeAccountController,
			getExchangeAccountController,
			getAllExchangeAccountsController,
			getHoldingsController,
			getTransactionsController,
			syncExchangeAccountController,
			syncExchangeAccountsController
		);
		const integrationRouter = RouterConfiguration.getIntegrationRouter(exchangeAccountRouter);

		const expressApp = WebAppConfiguration.getExpressApp(config, userRouter, integrationRouter, logger);

		const server = expressApp.boot();

		const testServer = new TestServer(userDatabase, exchangeAccountDatabase, server, config, logger);
		return testServer;
	}

	public async close(): Promise<void> {
		this.server.close();
	}
}
