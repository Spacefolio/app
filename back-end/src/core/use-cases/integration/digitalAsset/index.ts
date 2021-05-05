export * from './saveDigitalAssets';
export * from './getDigitalAsset';
export * from './getDigitalAssetCurrentValue';
export * from './getDigitalAssetHistoricalValue';

export {
	default as IDigitalAssetEntityGateway,
	IDigitalAssetMarketData
} from './DigitalAssetEntityGateway';

export {
	default as IDigitalAssetHistoryEntityGateway
} from './DigitalAssetHistoryEntityGateway';
