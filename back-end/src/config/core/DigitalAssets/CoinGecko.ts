import axios from 'axios';
import { IHistoricalPrice } from '../../../core/entities/Integrations/Asset';
import { ONE_DAY, ONE_HOUR } from '../../../core/entities/Integrations/Timeslice';
import { IDigitalAssetMarketData } from '../../../core/use-cases/integration/digitalAsset';
import IDigitalAssetAdapter from '../../../data/Integrations/DigitalAsset/DigitalAssetAdapter';

interface IHistoricalDataResponse {
	prices: [number, number][]; // time and price
}
class CoinGecko implements IDigitalAssetAdapter {
	public async fetchHourlyData(assetId: string): Promise<IHistoricalPrice[]> {
		const now = Date.now() / 1000;
		const toTimestamp = now;
		const lastHour = now - (now % (ONE_HOUR / 1000));
		const fromTimestamp = lastHour - 8 * (ONE_DAY / 1000); // subtract 8 days (in seconds) to get one week ago

		const endpoint = `https://api.coingecko.com/api/v3/coins/${assetId}/market_chart/range?vs_currency=usd&from=${fromTimestamp}&to=${toTimestamp}`;
		const hourlyDataJson = await axios
			.get<IHistoricalDataResponse>(endpoint)
			.then((jsonResponse) => jsonResponse.data)
			.catch(() => {
				return { prices: [] };
			});

    const hourlyData: IHistoricalPrice[] = [];

		for (let i = 0; i < hourlyDataJson.prices.length; i++) {
			const timestamp = hourlyDataJson.prices[i][0];
			const hour =
				timestamp % ONE_HOUR >= ONE_HOUR / 2 ? timestamp + (ONE_HOUR - (timestamp % ONE_HOUR)) : timestamp - (timestamp % ONE_HOUR); // round to nearest hour
			hourlyData.push({ timestamp: hour, price: hourlyDataJson.prices[i][1] });
		}

    return hourlyData;
	}

	public async fetchDailyData(assetId: string): Promise<IHistoricalPrice[]> {
		const endpoint = `https://api.coingecko.com/api/v3/coins/${assetId}/market_chart?vs_currency=usd&days=10000`;
		const historicalDataJson = await axios
			.get<IHistoricalDataResponse>(endpoint)
			.then((jsonResponse) => jsonResponse.data)
			.catch((err) => {
				throw err;
			});

		return historicalDataJson.prices.map((timeAndPrice) => {
			let timestamp: number = timeAndPrice[0];
			const leftover = timestamp % ONE_DAY;
			if (leftover >= ONE_DAY / 2) {
				// halfway through the day
				// round up to next day
				timestamp += ONE_DAY - leftover;
			} else {
				// round down to start of this day
				timestamp -= leftover;
			}
			return { timestamp, price: timeAndPrice[1] };
		});
	}

	public async fetchDigitalAssets(): Promise<IDigitalAssetMarketData[]> {
		let digitalAssets: IDigitalAssetMarketData[] = [];

		digitalAssets = await this.fetchAllCoinsMarketDataCursor();
		return digitalAssets;
	}

	public async fetchDigitalAsset(assetId: string): Promise<IDigitalAssetMarketData> {
		const digitalAsset: IDigitalAssetMarketData = await this.fetchCoinMarketData(assetId);
		return digitalAsset;
	}

	private async fetchAllCoinsMarketDataCursor(page = 1): Promise<IDigitalAssetMarketData[]> {
		const results = await this.fetchCoinMarketDataPage(page);
		if (results.length > 0) {
			return results.concat(await this.fetchAllCoinsMarketDataCursor(page + 1));
		} else {
			return results;
		}
	}

	private async fetchCoinMarketDataPage(page = 1): Promise<IDigitalAssetMarketData[]> {
		const results = await axios
			.get<IDigitalAssetMarketData[]>(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=true`
			)
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				throw err;
			});

		return results;
	}

	private async fetchCoinMarketData(assetId: string): Promise<IDigitalAssetMarketData> {
		console.log('Grabbed updated market data for ' + assetId);
		const results = await axios.get<IDigitalAssetMarketData[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetId}&order=market_cap_desc&per_page=250&page=1&sparkline=true`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw err;
		});

		return results[0];
	}
}

export default CoinGecko;
