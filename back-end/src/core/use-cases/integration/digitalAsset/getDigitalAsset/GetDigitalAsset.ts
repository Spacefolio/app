import { GetDigitalAssetInvalidRequest, GetDigitalAssetRequest, GetDigitalAssetResponse } from '.';
import { IDigitalAssetEntityGateway } from '..';
import { IUseCase, Result } from '../../../../definitions';
import { IDigitalAsset } from '../../../../entities/Integrations/Asset';
import { DigitalAssetNotFound } from './errors';

class GetDigitalAssetUseCase implements IUseCase<GetDigitalAssetRequest, GetDigitalAssetResponse> {
	private digitalAssetEntityGateway: IDigitalAssetEntityGateway;

	constructor(
		digitalAssetEntityGateway: IDigitalAssetEntityGateway
	) {
		this.digitalAssetEntityGateway = digitalAssetEntityGateway;
	}

	async execute(request: GetDigitalAssetRequest): Promise<GetDigitalAssetResponse> {
    if (!request || !request.assetId) {
			return Result.fail(new GetDigitalAssetInvalidRequest(request));
		}

    const exists = await this.digitalAssetEntityGateway.exists(request.assetId);

    if (!exists) {
      return Result.fail(new DigitalAssetNotFound(request.assetId));
    }

    const asset = await this.digitalAssetEntityGateway.getDigitalAsset(request.assetId);

		if (asset) {
      return Result.ok<IDigitalAsset>(asset);
    }

		return Result.fail(new DigitalAssetNotFound(request.assetId));
	}
}

export default GetDigitalAssetUseCase;
