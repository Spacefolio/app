import {
	AddExchangeAccountUseCase,
	GetAllExchangeAccountsUseCase,
	GetCurrentHoldingsUseCase,
	GetExchangeAccountUseCase,
	GetTransactionsUseCase,
	RemoveExchangeAccountUseCase,
	SyncExchangeAccountsUseCase,
	SyncExchangeAccountUseCase,
} from '../../core/use-cases/integration/exchangeAccount';
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

	static getAddExchangeAccountController(addExchangeAccountUseCase: AddExchangeAccountUseCase): AddExchangeAccountController {
		return new AddExchangeAccountController(addExchangeAccountUseCase);
	}

	static getRemoveExchangeAccountController(removeExchangeAccountUseCase: RemoveExchangeAccountUseCase): RemoveExchangeAccountController {
		return new RemoveExchangeAccountController(removeExchangeAccountUseCase);
	}

	static getGetExchangeAccountController(getExchangeAccountUseCase: GetExchangeAccountUseCase): GetExchangeAccountController {
		return new GetExchangeAccountController(getExchangeAccountUseCase);
	}

	static getGetAllExchangeAccountsController(
		getAllExchangeAccountsUseCase: GetAllExchangeAccountsUseCase
	): GetAllExchangeAccountsController {
		return new GetAllExchangeAccountsController(getAllExchangeAccountsUseCase);
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

	static getSyncExchangeAccountsController(syncExchangeAccountsUseCase: SyncExchangeAccountsUseCase): SyncExchangeAccountsController {
		return new SyncExchangeAccountsController(syncExchangeAccountsUseCase);
	}
}

export default ControllersConfiguration;
