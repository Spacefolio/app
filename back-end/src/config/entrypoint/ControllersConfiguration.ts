import { AddExchangeAccountUseCase, GetAllExchangeAccountsUseCase, GetExchangeAccountUseCase, RemoveExchangeAccountUseCase } from '../../core/use-cases/integration/exchangeAccount';
import { RegisterUserUseCase, AuthenticateUserUseCase } from '../../core/use-cases/user';
import {
	RegisterUserController,
	AuthenticateUserController,
	AddExchangeAccountController,
	RemoveExchangeAccountController,
	GetExchangeAccountController,
	GetAllExchangeAccountsController,
} from '../../entrypoint/web/controllers';

class ControllersConfiguration {
	static getAuthenticateUserController(authenticateUserUseCase: AuthenticateUserUseCase): AuthenticateUserController {
		return new AuthenticateUserController(authenticateUserUseCase);
	}

	static getRegisterUserController(registerUserUseCase: RegisterUserUseCase): RegisterUserController {
		return new RegisterUserController(registerUserUseCase);
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

	static getGetAllExchangeAccountsController(getAllExchangeAccountsUseCase: GetAllExchangeAccountsUseCase): GetAllExchangeAccountsController {
		return new GetAllExchangeAccountsController(getAllExchangeAccountsUseCase);
	}
}

export default ControllersConfiguration;
