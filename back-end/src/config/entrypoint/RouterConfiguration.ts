import {
	AddExchangeAccountController,
	AuthenticateUserController,
	RegisterUserController,
	RemoveExchangeAccountController,
	GetExchangeAccountController,
	GetAllExchangeAccountsController,
	GetHoldingsController,
	GetTransactionsController,
	SyncExchangeAccountController,
	SyncExchangeAccountsController,
	CheckRegistrationController,
	GetMetaportfolioChartController,
} from '../../entrypoint/web/controllers';
import ExchangeAccountRouter from '../../entrypoint/web/routers/ExchangeAccountRouter';
import IntegrationRouter from '../../entrypoint/web/routers/IntegrationRouter';
import PortfolioRouter from '../../entrypoint/web/routers/PortfolioRouter';
import UserRouter from '../../entrypoint/web/routers/UserRouter';

class RouterConfiguration {
	static getUserRouter(
		authenticateUserController: AuthenticateUserController,
		registerUserController: RegisterUserController,
		checkRegistrationController: CheckRegistrationController
	): UserRouter {
		return new UserRouter(authenticateUserController, registerUserController, checkRegistrationController);
	}

	static getExchangeAccountRouter(
		addExchangeAccountController: AddExchangeAccountController,
		removeExchangeAccountController: RemoveExchangeAccountController,
		getExchangeAccountController: GetExchangeAccountController,
		getAllExchangeAccountsController: GetAllExchangeAccountsController,
		getHoldingsController: GetHoldingsController,
		getTransactionsController: GetTransactionsController,
		syncExchangeAccountController: SyncExchangeAccountController,
		syncExchangeAccountsController: SyncExchangeAccountsController
	): ExchangeAccountRouter {
		return new ExchangeAccountRouter(
			addExchangeAccountController,
			removeExchangeAccountController,
			getExchangeAccountController,
			getAllExchangeAccountsController,
			getHoldingsController,
			getTransactionsController,
			syncExchangeAccountController,
			syncExchangeAccountsController
		);
	}

	static getIntegrationRouter(exchangeAccountRouter: ExchangeAccountRouter): IntegrationRouter {
		return new IntegrationRouter(exchangeAccountRouter);
	}

	static getPortfolioRouter(
		getExchangeAccountController: GetExchangeAccountController,
		getAllExchangeAccountsController: GetAllExchangeAccountsController,
		syncExchangeAccountsController: SyncExchangeAccountsController,
		getMetaportfolioChartController: GetMetaportfolioChartController
	): PortfolioRouter {
		return new PortfolioRouter(getExchangeAccountController, getAllExchangeAccountsController, syncExchangeAccountsController, getMetaportfolioChartController);
	}
}

export default RouterConfiguration;
