import { GetTransactionsRequest, GetTransactionsResponse } from '.';
import { IExchangeAccountEntityGateway } from '..';
import { IUseCase, Result } from '../../../../definitions';
import { ExchangeAccount, User } from '../../../../entities';
import { IDigitalAssetTransaction } from '../../../../entities/Integrations/Transaction';
import { IUserEntityGateway, UserNotFound } from '../../../user';
import { ExchangeAccountNotFound, GetTransactionsInvalidRequest } from './errors';

class GetTransactionsUseCase implements IUseCase<GetTransactionsRequest, GetTransactionsResponse> {
	private userEntityGateway: IUserEntityGateway;
	private exchangeAccountEntityGateway: IExchangeAccountEntityGateway;

	constructor(userEntityGateway: IUserEntityGateway, exchangeAccountEntityGateway: IExchangeAccountEntityGateway) {
		this.userEntityGateway = userEntityGateway;
		this.exchangeAccountEntityGateway = exchangeAccountEntityGateway;
	}

	async execute(request: GetTransactionsRequest): Promise<GetTransactionsResponse> {
		if (!request || !request.email || !request.accountId) {
			return Result.fail(new GetTransactionsInvalidRequest(request));
		}

		const user: User | undefined = await this.userEntityGateway.getUser(request.email);

		if (!user) {
			return Result.fail(new UserNotFound(request.email));
		}

		const accountMatches = (account: ExchangeAccount) => account.accountId === request.accountId;
		const userHasThisAccount = user.exchangeAccounts.some(accountMatches);
		if (!userHasThisAccount) {
			return Result.fail(new ExchangeAccountNotFound(request.accountId));
		}

		const exchangeAccount = await this.exchangeAccountEntityGateway.getExchangeAccount(request.accountId);

		if (!exchangeAccount) {
			return Result.fail(new ExchangeAccountNotFound(request.accountId));
		}

		return Result.ok<IDigitalAssetTransaction[]>(exchangeAccount.transactions);
	}
}

export default GetTransactionsUseCase;
