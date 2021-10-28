import { GetMetaportfolioChartInvalidRequest, GetMetaportfolioChartRequest, GetMetaportfolioChartResponse } from '.';
import { IUseCase, Result } from '../../../definitions';
import { Chart, User } from '../../../entities';
import { IExchangeAccountEntityGateway } from '../../integration/exchangeAccount';
import { IUserEntityGateway, UserNotFound } from '../../user';

class GetMetaportfolioChartUseCase implements IUseCase<GetMetaportfolioChartRequest, GetMetaportfolioChartResponse> {
	private userEntityGateway: IUserEntityGateway;
	private exchangeAccountEntityGateway: IExchangeAccountEntityGateway;

	constructor(userEntityGateway: IUserEntityGateway, exchangeAccountEntityGateway: IExchangeAccountEntityGateway) {
		this.userEntityGateway = userEntityGateway;
		this.exchangeAccountEntityGateway = exchangeAccountEntityGateway;
	}

	async execute(request: GetMetaportfolioChartRequest): Promise<GetMetaportfolioChartResponse> {
		if (!request || !request.email) {
			return Result.fail(new GetMetaportfolioChartInvalidRequest(request));
		}

		const user: User | undefined = await this.userEntityGateway.getUser(request.email);

		if (!user) {
			return Result.fail(new UserNotFound(request.email));
		}

    const exchangeAccounts = user.exchangeAccounts;

    //createChartFromExchangeAccount(exchangeAccount.)

		return Result.ok<Chart>([]);
	}
}

export default GetMetaportfolioChartUseCase;
