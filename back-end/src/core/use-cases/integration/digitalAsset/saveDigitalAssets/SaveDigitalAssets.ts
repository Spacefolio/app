import { SaveDigitalAssetsResponse } from '.';
import { IDigitalAssetEntityGateway, IDigitalAssetMarketData } from '..';
import { IUseCase, Result } from '../../../../definitions';
import { IDigitalAsset } from '../../../../entities/Integrations/Asset';

class SaveDigitalAssetsUseCase implements IUseCase<undefined, SaveDigitalAssetsResponse> {
	private digitalAssetEntityGateway: IDigitalAssetEntityGateway;
	private fetchDigitalAssets: () => Promise<IDigitalAssetMarketData[]>

	constructor(
		digitalAssetEntityGateway: IDigitalAssetEntityGateway,
		fetchDigitalAssets: () => Promise<IDigitalAssetMarketData[]>
	) {
		this.digitalAssetEntityGateway = digitalAssetEntityGateway;
		this.fetchDigitalAssets = fetchDigitalAssets;
	}

	async execute(): Promise<SaveDigitalAssetsResponse> {

		const marketsData = await this.fetchDigitalAssets();

		const assets: IDigitalAsset[] = [];

		for (const marketData of marketsData)
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
