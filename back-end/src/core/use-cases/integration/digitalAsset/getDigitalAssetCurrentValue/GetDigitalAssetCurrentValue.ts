import { GetDigitalAssetCurrentValueInvalidRequest, GetDigitalAssetCurrentValueRequest, GetDigitalAssetCurrentValueResponse } from '.';
import { IDigitalAssetEntityGateway } from '..';
import { IUseCase, Result } from '../../../../definitions';
import { DigitalAssetNotFound } from './errors';

class GetDigitalAssetCurrentValueUseCase implements IUseCase<GetDigitalAssetCurrentValueRequest, GetDigitalAssetCurrentValueResponse> {
	private digitalAssetEntityGateway: IDigitalAssetEntityGateway;

	constructor(
		digitalAssetEntityGateway: IDigitalAssetEntityGateway
	) {
		this.digitalAssetEntityGateway = digitalAssetEntityGateway;
	}

	async execute(request: GetDigitalAssetCurrentValueRequest): Promise<GetDigitalAssetCurrentValueResponse> {
    if (!request || !request.assetId) {
			return Result.fail(new GetDigitalAssetCurrentValueInvalidRequest(request));
		}

    const exists = await this.digitalAssetEntityGateway.exists(request.assetId);

    if (!exists) {
      return Result.fail(new DigitalAssetNotFound(request.assetId));
    }

    const asset = await this.digitalAssetEntityGateway.getDigitalAsset(request.assetId);

		if (asset) {
      return Result.ok<number>(asset.currentPrice);
    }

		return Result.fail(new DigitalAssetNotFound(request.assetId));
	}
}

export default GetDigitalAssetCurrentValueUseCase;
