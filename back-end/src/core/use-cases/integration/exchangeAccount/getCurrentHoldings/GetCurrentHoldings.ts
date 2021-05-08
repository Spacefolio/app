import { GetCurrentHoldingsRequest, GetCurrentHoldingsResponse } from '.';
import { IExchangeAccountEntityGateway } from '..';
import { IUseCase, Result } from '../../../../definitions';
import { ExchangeAccount, IHolding, User } from '../../../../entities';
import { IUserEntityGateway, UserNotFound } from '../../../user';
import { ExchangeAccountNotFound, GetCurrentHoldingsInvalidRequest } from './errors';

class GetCurrentHoldingsUseCase implements IUseCase<GetCurrentHoldingsRequest, GetCurrentHoldingsResponse> {
	private userEntityGateway: IUserEntityGateway;
	private exchangeAccountEntityGateway: IExchangeAccountEntityGateway;

	constructor(userEntityGateway: IUserEntityGateway, exchangeAccountEntityGateway: IExchangeAccountEntityGateway) {
		this.userEntityGateway = userEntityGateway;
		this.exchangeAccountEntityGateway = exchangeAccountEntityGateway;
	}

	async execute(request: GetCurrentHoldingsRequest): Promise<GetCurrentHoldingsResponse> {
		if (!request || !request.email || !request.accountId) {
			return Result.fail(new GetCurrentHoldingsInvalidRequest(request));
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

		return Result.ok<IHolding[]>(exchangeAccount.holdings);
	}
}

export default GetCurrentHoldingsUseCase;
