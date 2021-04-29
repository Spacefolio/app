import { RemoveExchangeAccountRequest, RemoveExchangeAccountResponse } from '.';
import { IExchangeAccountEntityGateway } from '..';
import { IUseCase, Result } from '../../../../definitions';
import { ExchangeAccount, User } from '../../../../entities';
import { IUserEntityGateway, UserNotFound } from '../../../user';
import { ExchangeAccountNotFound, RemoveExchangeAccountActionFailed, RemoveExchangeAccountInvalidRequest } from './errors';

class RemoveExchangeAccountUseCase implements IUseCase<RemoveExchangeAccountRequest, RemoveExchangeAccountResponse> {
	private userEntityGateway: IUserEntityGateway;
	private exchangeAccountEntityGateway: IExchangeAccountEntityGateway;

	constructor(userEntityGateway: IUserEntityGateway, exchangeAccountEntityGateway: IExchangeAccountEntityGateway) {
		this.userEntityGateway = userEntityGateway;
		this.exchangeAccountEntityGateway = exchangeAccountEntityGateway;
	}

	async execute(request: RemoveExchangeAccountRequest): Promise<RemoveExchangeAccountResponse> {
		if (!request || !request.email || !request.accountId) {
			return Result.fail(new RemoveExchangeAccountInvalidRequest(request));
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

    await this.userEntityGateway.removeExchangeAccountForUser(request.email, request.accountId);
		const removedAccount = await this.exchangeAccountEntityGateway.deleteExchangeAccount(request.accountId);
    if (!removedAccount) { return Result.fail(new RemoveExchangeAccountActionFailed()); }

		return Result.ok<ExchangeAccount>(removedAccount);
	}
}

export default RemoveExchangeAccountUseCase;
