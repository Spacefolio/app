import { GetAllExchangeAccountsInvalidRequest, GetAllExchangeAccountsRequest, GetAllExchangeAccountsResponse } from '.';
import { IExchangeAccountEntityGateway } from '..';
import { IUseCase, Result } from '../../../../definitions';
import { ExchangeAccount, User } from '../../../../entities';
import { IUserEntityGateway, UserNotFound } from '../../../user';

class GetAllExchangeAccountsUseCase implements IUseCase<GetAllExchangeAccountsRequest, GetAllExchangeAccountsResponse> {
	private userEntityGateway: IUserEntityGateway;
	private exchangeAccountEntityGateway: IExchangeAccountEntityGateway;

	constructor(userEntityGateway: IUserEntityGateway, exchangeAccountEntityGateway: IExchangeAccountEntityGateway) {
		this.userEntityGateway = userEntityGateway;
		this.exchangeAccountEntityGateway = exchangeAccountEntityGateway;
	}

	async execute(request: GetAllExchangeAccountsRequest): Promise<GetAllExchangeAccountsResponse> {
		if (!request || !request.email) {
			return Result.fail(new GetAllExchangeAccountsInvalidRequest(request));
		}

		const user: User | undefined = await this.userEntityGateway.getUser(request.email);

		if (!user) {
			return Result.fail(new UserNotFound(request.email));
		}

		return Result.ok<ExchangeAccount[]>(user.exchangeAccounts);
	}
}

export default GetAllExchangeAccountsUseCase;
