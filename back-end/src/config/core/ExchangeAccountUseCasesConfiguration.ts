import { IDigitalAssetEntityGateway, IDigitalAssetHistoryEntityGateway } from '../../core/use-cases/integration/digitalAsset';
import {
	AddExchangeAccountUseCase,
	GetAllExchangeAccountsUseCase,
	GetCurrentHoldingsUseCase,
	GetExchangeAccountUseCase,
	GetExchangeHandler,
	GetTransactionsUseCase,
	IExchangeAccountEntityGateway,
	RemoveExchangeAccountUseCase,
	SyncExchangeAccountUseCase,
	SyncExchangeAccountsUseCase
} from '../../core/use-cases/integration/exchangeAccount';
import { VerifyCredentialsHandler } from '../../core/use-cases/integration/exchangeAccount/addExchangeAccount/AddExchangeAccount';
import { IUserEntityGateway } from '../../core/use-cases/user';
import { makeId } from '../../data';

class ExchangeAccountUseCasesConfiguration {
	static getAddExchangeAccountUseCase(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway,
		verifyCredentials: VerifyCredentialsHandler
	): AddExchangeAccountUseCase {
		return new AddExchangeAccountUseCase(userEntityGateway, exchangeAccountEntityGateway, makeId, verifyCredentials);
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

	static getSyncExchangeAccountUseCase(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway,
		digitalAssetEntityGateway: IDigitalAssetEntityGateway,
		digitalAssetHistoryEntityGateway: IDigitalAssetHistoryEntityGateway,
		getExchange: GetExchangeHandler
	): SyncExchangeAccountUseCase {
		return new SyncExchangeAccountUseCase(userEntityGateway, exchangeAccountEntityGateway, digitalAssetEntityGateway, digitalAssetHistoryEntityGateway, getExchange);
	}

	static getSyncExchangeAccountsUseCase(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway,
		digitalAssetEntityGateway: IDigitalAssetEntityGateway,
		digitalAssetHistoryEntityGateway: IDigitalAssetHistoryEntityGateway,
		getExchange: GetExchangeHandler
	): SyncExchangeAccountsUseCase {
		return new SyncExchangeAccountsUseCase(userEntityGateway, exchangeAccountEntityGateway, digitalAssetEntityGateway, digitalAssetHistoryEntityGateway, getExchange);
	}
}

export default ExchangeAccountUseCasesConfiguration;
