import {
	AddExchangeAccountUseCase,
	GetAllExchangeAccountsUseCase,
	GetExchangeAccountUseCase,
	IExchangeAccountEntityGateway,
	RemoveExchangeAccountUseCase,
} from '../../core/use-cases/integration/exchangeAccount';
import { IUserEntityGateway } from '../../core/use-cases/user';
import { makeId } from '../../data';

class ExchangeAccountUseCasesConfiguration {
	static getAddExchangeAccountUseCase(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway
	): AddExchangeAccountUseCase {
		return new AddExchangeAccountUseCase(userEntityGateway, exchangeAccountEntityGateway, makeId);
	}

	static getRemoveExchangeAccountUseCase(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway
	): RemoveExchangeAccountUseCase {
		return new RemoveExchangeAccountUseCase(userEntityGateway, exchangeAccountEntityGateway);
	}

	static getGetExchangeAccountUseCase(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway
	): GetExchangeAccountUseCase {
		return new GetExchangeAccountUseCase(userEntityGateway, exchangeAccountEntityGateway);
	}

	static getGetAllExchangeAccountsUseCase(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway
	): GetAllExchangeAccountsUseCase {
		return new GetAllExchangeAccountsUseCase(userEntityGateway, exchangeAccountEntityGateway);
	}
}

export default ExchangeAccountUseCasesConfiguration;
