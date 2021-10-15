import config from '.';
import { connectMongoose } from '../data';
import { ExchangeAccountUseCasesConfiguration, UserUseCasesConfiguration } from './core';
import { DigitalAssetsConfiguration } from './core/DigitalAssets';
import { ExchangesConfiguration } from './core/Exchanges';
import { DatabaseConfiguration } from './data';
import { LoggerConfiguration, ControllersConfiguration, RouterConfiguration, WebAppConfiguration } from './entrypoint';
import PresentersConfiguration from './entrypoint/PresentersConfiguration';

export async function main(): Promise<void> {
	const logger = LoggerConfiguration.getLogger(config);

	await connectMongoose(config, logger);

	const userDatabase = DatabaseConfiguration.getUserMongoDatabase();
	const exchangeAccountDatabase = DatabaseConfiguration.getExchangeAccountMongoDatabase();
	const digitalAssetAdapter = DigitalAssetsConfiguration.getDigitalAssetAdapter();
	const digitalAssetDatabase = DatabaseConfiguration.getDigitalAssetMongoDatabase(digitalAssetAdapter);
	const digitalAssetHistoryDatabase = DatabaseConfiguration.getDigitalAssetHistoryMongoDatabase(digitalAssetAdapter);

	const authenticateUserUseCase = UserUseCasesConfiguration.getAuthenticateUserUseCase(userDatabase);
	const registerUserUseCase = UserUseCasesConfiguration.getRegisterUserUseCase(userDatabase);
	const checkRegistrationUseCase = UserUseCasesConfiguration.getCheckRegistrationUseCase(userDatabase);
	const authenticateUserController = ControllersConfiguration.getAuthenticateUserController(authenticateUserUseCase);
	const registerUserController = ControllersConfiguration.getRegisterUserController(registerUserUseCase);
	const checkRegistrationController = ControllersConfiguration.getCheckRegistrationController(checkRegistrationUseCase);

	const userRouter = RouterConfiguration.getUserRouter(authenticateUserController, registerUserController, checkRegistrationController);

	const addExchangeAccountUseCase = ExchangeAccountUseCasesConfiguration.getAddExchangeAccountUseCase(
		userDatabase,
		exchangeAccountDatabase,
		ExchangesConfiguration.getVerifyCredentials()
	);
	const exchangeAccountPresenter = PresentersConfiguration.getExchangeAccountPresenter();
	const addExchangeAccountController = ControllersConfiguration.getAddExchangeAccountController(addExchangeAccountUseCase, exchangeAccountPresenter);
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

	const getHoldingsUseCase = ExchangeAccountUseCasesConfiguration.getGetHoldingsUseCase(
		userDatabase,
		exchangeAccountDatabase
	);
	const getHoldingsController = ControllersConfiguration.getGetHoldingsController(getHoldingsUseCase);

	const getTransactionsUseCase = ExchangeAccountUseCasesConfiguration.getGetTransactionsUseCase(
		userDatabase,
		exchangeAccountDatabase
	);
	const getTransactionsController = ControllersConfiguration.getGetTransactionsController(getTransactionsUseCase);

	const syncExchangeAccountUseCase = ExchangeAccountUseCasesConfiguration.getSyncExchangeAccountUseCase(
		userDatabase,
		exchangeAccountDatabase,
		digitalAssetDatabase,
		digitalAssetHistoryDatabase,
		ExchangesConfiguration.get
	);

	const syncExchangeAccountController = ControllersConfiguration.getSyncExchangeAccountController(syncExchangeAccountUseCase);

	const syncExchangeAccountsUseCase = ExchangeAccountUseCasesConfiguration.getSyncExchangeAccountsUseCase(
		userDatabase,
		exchangeAccountDatabase,
		digitalAssetDatabase,
		digitalAssetHistoryDatabase,
		ExchangesConfiguration.get
	);

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

	expressApp.boot();
}
