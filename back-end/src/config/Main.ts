import config from '.';
import { connectMongoose } from '../data';
import { ExchangeAccountUseCasesConfiguration, UserUseCasesConfiguration } from './core';
import { DatabaseConfiguration } from './data';
import { LoggerConfiguration, ControllersConfiguration, RouterConfiguration, WebAppConfiguration } from './entrypoint';

export async function main(): Promise<void> {
	const logger = LoggerConfiguration.getLogger(config);
	
	await connectMongoose(config, logger);

	const userDatabase = DatabaseConfiguration.getUserMongoDatabase();
	const exchangeAccountDatabase = DatabaseConfiguration.getExchangeAccountMongoDatabase();
	
	const authenticateUserUseCase = UserUseCasesConfiguration.getAuthenticateUserUseCase(userDatabase);
	const registerUserUseCase = UserUseCasesConfiguration.getRegisterUserUseCase(userDatabase);
	const authenticateUserController = ControllersConfiguration.getAuthenticateUserController(authenticateUserUseCase);
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
}