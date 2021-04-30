import {
	AddExchangeAccountUseCase,
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
}

export default ExchangeAccountUseCasesConfiguration;
