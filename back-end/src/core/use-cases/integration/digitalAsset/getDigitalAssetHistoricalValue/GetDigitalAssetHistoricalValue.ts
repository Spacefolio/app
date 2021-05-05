import { GetDigitalAssetHistoricalValueInvalidRequest, GetDigitalAssetHistoricalValueRequest, GetDigitalAssetHistoricalValueResponse } from '.';
import { IUseCase, Result } from '../../../../definitions';
import { IDigitalAssetHistoryEntityGateway } from '..';
import { DigitalAssetHistoricalPriceNotFound, DigitalAssetHistoryNotFound } from './errors';
import { IHistoricalPrice } from '../../../../entities/Integrations/Asset';

class GetDigitalAssetHistoricalValueUseCase implements IUseCase<GetDigitalAssetHistoricalValueRequest, GetDigitalAssetHistoricalValueResponse> {
	private digitalAssetHistoryEntityGateway: IDigitalAssetHistoryEntityGateway;

	constructor(
		digitalAssetHistoryEntityGateway: IDigitalAssetHistoryEntityGateway
	) {
		this.digitalAssetHistoryEntityGateway = digitalAssetHistoryEntityGateway;
	}

	async execute(request: GetDigitalAssetHistoricalValueRequest): Promise<GetDigitalAssetHistoricalValueResponse> {
    if (!request || !request.assetId || !request.timestamp) {
			return Result.fail(new GetDigitalAssetHistoricalValueInvalidRequest(request));
		}

    const exists = await this.digitalAssetHistoryEntityGateway.exists(request.assetId);

    if (!exists) {
      return Result.fail(new DigitalAssetHistoryNotFound(request.assetId));
    }

    const historicalPrice = await this.digitalAssetHistoryEntityGateway.getHistoricalValue(request.assetId, request.timestamp);

		if (historicalPrice) {
      return Result.ok<IHistoricalPrice>(historicalPrice);
    }

		return Result.fail(new DigitalAssetHistoricalPriceNotFound(request.assetId, request.timestamp));
	}
}

export default GetDigitalAssetHistoricalValueUseCase;
