import {
	AddExchangeAccountController,
	AuthenticateUserController,
	RegisterUserController,
	RemoveExchangeAccountController,
	GetExchangeAccountController,
	GetAllExchangeAccountsController,
	GetHoldingsController,
	GetTransactionsController,
	SyncExchangeAccountController
} from '../../entrypoint/web/controllers';
import ExchangeAccountRouter from '../../entrypoint/web/routers/ExchangeAccountRouter';
import IntegrationRouter from '../../entrypoint/web/routers/IntegrationRouter';
import UserRouter from '../../entrypoint/web/routers/UserRouter';

class RouterConfiguration {
	static getUserRouter(authenticateUserController: AuthenticateUserController, registerUserController: RegisterUserController): UserRouter {
		return new UserRouter(authenticateUserController, registerUserController);
	}

	static getExchangeAccountRouter(
		addExchangeAccountController: AddExchangeAccountController,
		removeExchangeAccountController: RemoveExchangeAccountController,
		getExchangeAccountController: GetExchangeAccountController,
		getAllExchangeAccountsController: GetAllExchangeAccountsController,
		getHoldingsController: GetHoldingsController,
		getTransactionsController: GetTransactionsController,
		syncExchangeAccountController: SyncExchangeAccountController
	): ExchangeAccountRouter {
		return new ExchangeAccountRouter(
			addExchangeAccountController,
			removeExchangeAccountController,
			getExchangeAccountController,
			getAllExchangeAccountsController,
			getHoldingsController,
			getTransactionsController,
			syncExchangeAccountController
		);
	}

	static getIntegrationRouter(exchangeAccountRouter: ExchangeAccountRouter): IntegrationRouter {
		return new IntegrationRouter(exchangeAccountRouter);
	}
}

export default RouterConfiguration;
