import { SaveDigitalAssetsInvalidRequest, SaveDigitalAssetsRequest, SaveDigitalAssetsResponse } from '.';
import { IDigitalAssetEntityGateway } from '..';
import { IUseCase, Result } from '../../../../definitions';
import { IDigitalAsset } from '../../../../entities/Integrations/Asset';

class SaveDigitalAssetsUseCase implements IUseCase<SaveDigitalAssetsRequest, SaveDigitalAssetsResponse> {
	private digitalAssetEntityGateway: IDigitalAssetEntityGateway;

	constructor(
		digitalAssetEntityGateway: IDigitalAssetEntityGateway,
	) {
		this.digitalAssetEntityGateway = digitalAssetEntityGateway;
	}

	async execute(request: SaveDigitalAssetsRequest): Promise<SaveDigitalAssetsResponse> {
		if (!request || !request.digitalAssets) {
			return Result.fail(new SaveDigitalAssetsInvalidRequest(request));
		}

		const assets: IDigitalAsset[] = [];

		for (const marketData of request.digitalAssets)
		{
			let asset: IDigitalAsset | undefined = undefined;

			const exists = await this.digitalAssetEntityGateway.exists(marketData.id)

			if (exists) {
				asset = await this.digitalAssetEntityGateway.updateDigitalAsset(marketData);
			} else {
				asset = await this.digitalAssetEntityGateway.createDigitalAsset(marketData);
			}

			if (asset) {
				assets.push(asset);
			}
		}

		return Result.ok<IDigitalAsset[]>(assets);
	}
}

export default SaveDigitalAssetsUseCase;
