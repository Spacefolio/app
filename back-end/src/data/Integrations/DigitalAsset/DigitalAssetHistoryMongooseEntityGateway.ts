import { Model } from 'mongoose';
import { IDigitalAssetHistory, IHistoricalPrice } from '../../../core/entities/Integrations/Asset';
import { ONE_HOUR } from '../../../core/entities/Integrations/Timeslice';
import { fiat } from '../../../core/entities/Integrations/Timeslices';
import { IDigitalAssetHistoryEntityGateway } from '../../../core/use-cases/integration/digitalAsset';
import IDigitalAssetAdapter from './DigitalAssetAdapter';
import { IDigitalAssetHistoryDocument } from './DigitalAssetHistoryModel';

class DigitalAssetHistoryMongooseEntityGateway implements IDigitalAssetHistoryEntityGateway {
	constructor(public DigitalAssetHistory: Model<IDigitalAssetHistoryDocument>, public DigitalAssetAdapter: IDigitalAssetAdapter) {}

	async getHourlyData(assetId: string, from: number, to: number): Promise<IHistoricalPrice[] | undefined> {
		const hourlyPrices: IHistoricalPrice[] = [];
		from = from - (from % ONE_HOUR);
		to = to - (to % ONE_HOUR);

		if (fiat(assetId)) {
			for (let i = from; i <= to; i += ONE_HOUR) {
				hourlyPrices.push({ timestamp: i, price: 1 });
			}
			return hourlyPrices;
		}

		let digitalAssetHistory = await this.getDigitalAssetHistory(assetId);

		if (
			!digitalAssetHistory ||
			digitalAssetHistory.hourlyPrices.length === 0 ||
			digitalAssetHistory.hourlyPrices[digitalAssetHistory.hourlyPrices.length - 1].timestamp < to
		) {
			digitalAssetHistory = await this.fetchHistory(assetId);
			if (!digitalAssetHistory || digitalAssetHistory.hourlyPrices.length === 0) {
				return [];
			}
		}

		const startIndex = digitalAssetHistory.hourlyPrices.findIndex((historicalPrice) => historicalPrice.timestamp == from);
		const endIndex = digitalAssetHistory.hourlyPrices.findIndex((historicalPrice) => historicalPrice.timestamp == to);
		if (startIndex == -1) return;
		if (endIndex == -1) {
			return digitalAssetHistory.hourlyPrices.slice(startIndex);
		}
		return digitalAssetHistory.hourlyPrices.slice(startIndex, endIndex + 1);
	}

	async exists(assetId: string): Promise<boolean> {
		const history = await this.DigitalAssetHistory.findOne({ assetId });
		return !!history;
	}

	async getDigitalAssetHistory(assetId: string): Promise<IDigitalAssetHistory | undefined> {
		const result = await this.DigitalAssetHistory.findOne({ assetId });
		return result || undefined;
	}

	async getHistoricalValue(assetId: string, timestamp: number): Promise<IHistoricalPrice | undefined> {
		const result = await this.DigitalAssetHistory.findOne({ assetId });
		if (!result) return;

		const historicalPrice = result.prices.find((historicalPrice) => historicalPrice.timestamp == timestamp);
		return historicalPrice;
	}

	async getHistoricalValues(assetId: string, from: number, to: number): Promise<IHistoricalPrice[] | undefined> {
		from = from - (from % ONE_HOUR);
		to = to - (to % ONE_HOUR);
		const result = await this.DigitalAssetHistory.findOne({ assetId });
		if (!result) return;

		const startIndex = result.prices.findIndex((historicalPrice) => historicalPrice.timestamp == from);
		const endIndex = result.prices.findIndex((historicalPrice) => historicalPrice.timestamp == to);
		if (startIndex == -1) return;
		if (endIndex == -1) return result.prices.slice(startIndex);

		return result.prices.slice(startIndex, endIndex + 1);
	}

	async updateDigitalAssetHistory(asset: IDigitalAssetHistory): Promise<IDigitalAssetHistory | undefined> {
		const history = await this.DigitalAssetHistory.updateOne({ assetId: asset.assetId }, { ...asset }, { upsert: true });
		return (history.nModified ?? 0) > 0 ? asset : undefined;
	}

	async createDigitalAssetHistory(payload: IDigitalAssetHistory): Promise<IDigitalAssetHistory> {
		await this.DigitalAssetHistory.updateOne({ assetId: payload.assetId }, { ...payload }, { upsert: true });
		return payload;
	}

	async deleteDigitalAssetHistory(assetId: string): Promise<IDigitalAssetHistory | undefined> {
		const result = await this.DigitalAssetHistory.findOneAndRemove({ assetId }).lean();
		if (!result) return;
		return result;
	}

	async getAllDigitalAssetHistories(): Promise<IDigitalAssetHistory[]> {
		return await this.DigitalAssetHistory.find({});
	}

	async clearDigitalAssetHistories(): Promise<void> {
		this.DigitalAssetHistory.remove({});
	}

	private async fetchHistory(assetId: string): Promise<IDigitalAssetHistory | undefined> {
		let historicalData = await this.DigitalAssetHistory.findOne({ assetId });
		if (!historicalData) {
			historicalData = new this.DigitalAssetHistory({ assetId, prices: [], hourlyPrices: [] });
		}

		// Fetch daily prices and combine with existing daily prices saved
		let dailyPrices = await this.DigitalAssetAdapter.fetchDailyData(assetId);
		const length = historicalData.prices.length;
		if (length > 0) {
			const lastTimestamp = historicalData.prices[length - 1].timestamp;
			const startIndex = dailyPrices.findIndex((entry) => entry.timestamp === lastTimestamp);
			if (startIndex !== -1) {
				dailyPrices = dailyPrices.slice(startIndex + 1);
			}
		}
		historicalData.prices.push(...dailyPrices);

		// Fetch hourly prices and combine with existing hourly prices saved
		let hourlyPrices = await this.DigitalAssetAdapter.fetchHourlyData(assetId);
		const length2 = historicalData.hourlyPrices.length;
		if (length2 > 0) {
			const lastTimestamp = historicalData.hourlyPrices[length2 - 1].timestamp;
			const startIndex = dailyPrices.findIndex((entry) => entry.timestamp === lastTimestamp);
			if (startIndex !== -1) {
				hourlyPrices = hourlyPrices.slice(startIndex + 1);
			}
		}
		historicalData.hourlyPrices.push(...hourlyPrices);

		const history = await this.createDigitalAssetHistory({ ...historicalData });
		return history;
	}
}

export default DigitalAssetHistoryMongooseEntityGateway;
