import { GetAvailableExchangesRequest } from '.';
import { IUseCase, Result } from '../../../../definitions';
import { IExchange } from '../../../../entities';
import GetAvailableExchangesResponse from './GetAvailableExchangesResponse';

class GetAvailableExchangesUseCase implements IUseCase<GetAvailableExchangesRequest, GetAvailableExchangesResponse> {
  private availableExchanges: IExchange[];
	constructor(availableExchanges: IExchange[]) {
		this.availableExchanges = availableExchanges;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async execute(request: GetAvailableExchangesRequest): Promise<GetAvailableExchangesResponse> {
		return Result.ok<IExchange[]>(this.availableExchanges);
	}
}

export default GetAvailableExchangesUseCase;
