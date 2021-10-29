import { IPresenter } from '../../core/definitions';
import {
	AddExchangeAccountUseCase,
	GetAllExchangeAccountsUseCase,
	GetAvailableExchangesUseCase,
	GetCurrentHoldingsUseCase,
	GetExchangeAccountUseCase,
	GetTransactionsUseCase,
	RemoveExchangeAccountUseCase,
	SyncExchangeAccountsUseCase,
	SyncExchangeAccountUseCase,
} from '../../core/use-cases/integration/exchangeAccount';
import { GetMetaportfolioChartUseCase } from '../../core/use-cases/portfolio/getMetaportfolioChart';
import { RegisterUserUseCase, AuthenticateUserUseCase, CheckRegistrationUseCase } from '../../core/use-cases/user';
import {
	RegisterUserController,
	AuthenticateUserController,
	AddExchangeAccountController,
	RemoveExchangeAccountController,
	GetExchangeAccountController,
	GetAllExchangeAccountsController,
	GetHoldingsController,
	GetTransactionsController,
	SyncExchangeAccountController,
	CheckRegistrationController,
	SyncExchangeAccountsController,
	GetMetaportfolioChartController,
	GetAvailableExchangesController,
} from '../../entrypoint/web/controllers';

class ControllersConfiguration {
	static getAuthenticateUserController(authenticateUserUseCase: AuthenticateUserUseCase): AuthenticateUserController {
		return new AuthenticateUserController(authenticateUserUseCase);
	}

	static getRegisterUserController(registerUserUseCase: RegisterUserUseCase): RegisterUserController {
		return new RegisterUserController(registerUserUseCase);
	}

	static getCheckRegistrationController(checkRegistrationUseCase: CheckRegistrationUseCase): CheckRegistrationController {
		return new CheckRegistrationController(checkRegistrationUseCase);
	}

	static getAddExchangeAccountController(
		addExchangeAccountUseCase: AddExchangeAccountUseCase,
		presenter?: IPresenter
	): AddExchangeAccountController {
		return new AddExchangeAccountController(addExchangeAccountUseCase, presenter);
	}

	static getRemoveExchangeAccountController(removeExchangeAccountUseCase: RemoveExchangeAccountUseCase): RemoveExchangeAccountController {
		return new RemoveExchangeAccountController(removeExchangeAccountUseCase);
	}

	static getGetExchangeAccountController(
		getExchangeAccountUseCase: GetExchangeAccountUseCase,
		presenter?: IPresenter
	): GetExchangeAccountController {
		return new GetExchangeAccountController(getExchangeAccountUseCase, presenter);
	}

	static getGetAllExchangeAccountsController(
		getAllExchangeAccountsUseCase: GetAllExchangeAccountsUseCase,
		presenter?: IPresenter
	): GetAllExchangeAccountsController {
		return new GetAllExchangeAccountsController(getAllExchangeAccountsUseCase, presenter);
	}

	static getGetHoldingsController(getHoldingsUseCase: GetCurrentHoldingsUseCase): GetHoldingsController {
		return new GetHoldingsController(getHoldingsUseCase);
	}

	static getGetTransactionsController(getTransactionsUseCase: GetTransactionsUseCase): GetTransactionsController {
		return new GetTransactionsController(getTransactionsUseCase);
	}

	static getSyncExchangeAccountController(syncExchangeAccountUseCase: SyncExchangeAccountUseCase): SyncExchangeAccountController {
		return new SyncExchangeAccountController(syncExchangeAccountUseCase);
	}

	static getSyncExchangeAccountsController(
		syncExchangeAccountsUseCase: SyncExchangeAccountsUseCase,
		presenter?: IPresenter
	): SyncExchangeAccountsController {
		return new SyncExchangeAccountsController(syncExchangeAccountsUseCase, presenter);
	}

	static getGetMetaportfolioChartController(
		getMetaportfolioChartUseCase: GetMetaportfolioChartUseCase,
		presenter?: IPresenter
	): GetMetaportfolioChartController {
		return new GetMetaportfolioChartController(getMetaportfolioChartUseCase, presenter);
	}

	static getGetAvailableExchangesController(
		getAvailableExchangesUseCase: GetAvailableExchangesUseCase,
		presenter?: IPresenter
	): GetAvailableExchangesController {
		return new GetAvailableExchangesController(getAvailableExchangesUseCase, presenter);
	}
}

export default ControllersConfiguration;
