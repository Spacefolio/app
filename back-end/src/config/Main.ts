import config from '.';
import { connectMongoose } from '../data';
import { UserUseCasesConfiguration } from './core';
import { DatabaseConfiguration } from './data';
import { LoggerConfiguration, ControllersConfiguration, RouterConfiguration, WebAppConfiguration } from './entrypoint';

export async function main(): Promise<void> {
	const logger = LoggerConfiguration.getLogger(config);

	//const db = DatabaseConfiguration.getUserInMemoryDatabase();
	await connectMongoose(config, logger);
	const userDatabase = DatabaseConfiguration.getUserMongoDatabase();

	const authenticateUserUseCase = UserUseCasesConfiguration.getAuthenticateUserUseCase(userDatabase);
	const registerUserUseCase = UserUseCasesConfiguration.getRegisterUserUseCase(userDatabase);

	const authenticateUserController = ControllersConfiguration.getAuthenticateUserController(authenticateUserUseCase);
	const registerUserController = ControllersConfiguration.getRegisterUserController(registerUserUseCase);

	const userRouter = RouterConfiguration.getUserRouter(authenticateUserController, registerUserController);
	const expressApp = WebAppConfiguration.getExpressApp(config, userRouter, logger);

	expressApp.boot();
}