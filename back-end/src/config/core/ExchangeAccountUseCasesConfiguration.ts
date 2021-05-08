import {
	AddExchangeAccountUseCase,
	GetAllExchangeAccountsUseCase,
	GetCurrentHoldingsUseCase,
	GetExchangeAccountUseCase,
	GetTransactionsUseCase,
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

	static getGetHoldingsUseCase(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway
	): GetCurrentHoldingsUseCase {
		return new GetCurrentHoldingsUseCase(userEntityGateway, exchangeAccountEntityGateway);
	}

	static getGetTransactionsUseCase(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway
	): GetTransactionsUseCase {
		return new GetTransactionsUseCase(userEntityGateway, exchangeAccountEntityGateway);
	}
}

export default ExchangeAccountUseCasesConfiguration;
