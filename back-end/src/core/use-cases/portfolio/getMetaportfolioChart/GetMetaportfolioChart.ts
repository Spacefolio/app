import { GetMetaportfolioChartInvalidRequest, GetMetaportfolioChartRequest, GetMetaportfolioChartResponse } from '.';
import { IUseCase, Result } from '../../../definitions';
import { Chart, ExchangeAccount, User } from '../../../entities';
import { IHistoricalPrice } from '../../../entities/Integrations/Asset';
import { IHoldingSnapshot } from '../../../entities/Integrations/HoldingSnapshot';
import { IHoldingSlice, ITimeslice, ITimeslices, ONE_DAY, ONE_HOUR, ONE_WEEK } from '../../../entities/Integrations/Timeslice';
import { Timespan } from '../../../entities/Portfolio/Chart';
import { IDigitalAssetHistoryEntityGateway } from '../../integration/digitalAsset';
import { ExchangeAccountNotFound, IExchangeAccountEntityGateway } from '../../integration/exchangeAccount';
import { IUserEntityGateway, UserNotFound } from '../../user';
import { ExchangeAccountsNotSynced } from './errors';

class GetMetaportfolioChartUseCase implements IUseCase<GetMetaportfolioChartRequest, GetMetaportfolioChartResponse> {
	private userEntityGateway: IUserEntityGateway;
	private exchangeAccountEntityGateway: IExchangeAccountEntityGateway;
	private digitalAssetHistoryEntityGateway: IDigitalAssetHistoryEntityGateway;

	constructor(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway,
		digitalAssetHistoryEntityGateway: IDigitalAssetHistoryEntityGateway
	) {
		this.userEntityGateway = userEntityGateway;
		this.exchangeAccountEntityGateway = exchangeAccountEntityGateway;
		this.digitalAssetHistoryEntityGateway = digitalAssetHistoryEntityGateway;
	}

	async execute(request: GetMetaportfolioChartRequest): Promise<GetMetaportfolioChartResponse> {
		if (!request || !request.email) {
			return Result.fail(new GetMetaportfolioChartInvalidRequest(request));
		}

		if (!request.timeframe) {
			request.timeframe = Timespan.ALL;
		}

		const user: User | undefined = await this.userEntityGateway.getUser(request.email);

		if (!user) {
			return Result.fail(new UserNotFound(request.email));
		}

		const exchangeAccounts = user.exchangeAccounts;

		const numberOfDays = this.getNumberOfDaysForTimespan(<Timespan>request.timeframe);
		const charts: Chart[] = [];

		if (request.accountId !== undefined) {
			let chart: Chart = [];
			const exchangeAccount = exchangeAccounts.find((account) => account.accountId === request.accountId);
			if (!exchangeAccount) {
				return Result.fail(new ExchangeAccountNotFound(request.accountId));
			}

			try {
				switch (<Timespan>request.timeframe) {
					case Timespan.H24:
						chart = await this.getTwentyFourHourChart(exchangeAccount);
						break;
					case Timespan.W1:
						chart = await this.getOneWeekChart(exchangeAccount);
						break;
					case Timespan.M1:
					case Timespan.M3:
					case Timespan.M6:
					case Timespan.Y1:
					case Timespan.ALL:
						chart = this.getDailyChart(exchangeAccount, numberOfDays);
						break;
					default:
						chart = [];
				}
			} catch (exception) {
				return Result.fail(new ExchangeAccountsNotSynced());
			}

			if (chart.length < 1) {
				if (request.timeframe === Timespan.H24 || request.timeframe === Timespan.W1) {
					const numHours = request.timeframe === Timespan.H24 ? 24 : 168;
					const latestHour = this.getLatestHour();
					for (let i = 0; i < numHours; i++) {
						chart.push({ timestamp: latestHour - (ONE_HOUR * (numHours - i)), value: { USD: 0 }});
					}
				} else {
					let today = Date.now();
					today = today - (today % ONE_DAY);
					const numDays = Math.min(numberOfDays, 365);
					for (let i = 0; i < numDays; i++) {
						chart.push({ timestamp: today - (ONE_DAY * (numDays - i)), value: { USD: 0 }});
					}
				}
			}

			return Result.ok<Chart>(chart);
		}

		try {
			for (const exchangeAccount of exchangeAccounts) {
				let chart: Chart = [];
				switch (<Timespan>request.timeframe) {
					case Timespan.H24:
						chart = await this.getTwentyFourHourChart(exchangeAccount);
						break;
					case Timespan.W1:
						chart = await this.getOneWeekChart(exchangeAccount);
						break;
					case Timespan.M1:
					case Timespan.M3:
					case Timespan.M6:
					case Timespan.Y1:
					case Timespan.ALL:
						chart = this.getDailyChart(exchangeAccount, numberOfDays);
						break;
					default:
						chart = [];
				}
	
				charts.push(chart);
			}
		} catch (exception) {
			return Result.fail(new ExchangeAccountsNotSynced());
		}

		
		const metaChart = this.combineCharts(charts);

		if (metaChart.length < 1) {
			if (request.timeframe === Timespan.H24 || request.timeframe === Timespan.W1) {
				const numHours = request.timeframe === Timespan.H24 ? 24 : 168;
				const latestHour = this.getLatestHour();
				for (let i = 0; i < numHours; i++) {
					metaChart.push({ timestamp: latestHour - (ONE_HOUR * (numHours - i)), value: { USD: 0 }});
				}
			} else {
				let today = Date.now();
				today = today - (today % ONE_DAY);
				const numDays = Math.min(numberOfDays, 365);
				for (let i = 0; i < numDays; i++) {
					metaChart.push({ timestamp: today - (ONE_DAY * (numDays - i)), value: { USD: 0 }});
				}
			}
		}
		return Result.ok<Chart>(metaChart);
	}

	public getDailyChart(exchangeAccount: ExchangeAccount, numberOfDays: number): Chart {
		const chart: Chart = [];
		const timeslices = Array.from(exchangeAccount.dailyTimeslices.values());
		const start = timeslices.length < numberOfDays ? 0 : timeslices.length - numberOfDays;

		for (let i = start; i < timeslices.length; i++) {
			chart.push({ timestamp: timeslices[i].start, value: { USD: timeslices[i].value.USD } });
		}
		
		return chart;
	}
	
	public async getTwentyFourHourChart(exchangeAccount: ExchangeAccount): Promise<Chart> {
		// Generate hourly time series for last 7 days (last whole hour and 167 previous hours)
		// if this is already cached, we can just return it as is. If there is partial data available,
		// we will append the latest data and return the whole series.
		const hourlyTimeSeries = await this.getLatestHourlyTimeSeries(exchangeAccount).catch(err => { throw(err); });
		return hourlyTimeSeries.slice(hourlyTimeSeries.length - 24);
	}
	
	public async getOneWeekChart(exchangeAccount: ExchangeAccount): Promise<Chart> {
		// Generate hourly time series for last 7 days (last whole hour and 167 previous hours)
		// if this is already cached, we can just return it as is. If there is partial data available,
		// we will append the latest data and return the whole series.
		const hourlyTimeSeries = await this.getLatestHourlyTimeSeries(exchangeAccount).catch(err => { throw(err); });
		return hourlyTimeSeries.slice(hourlyTimeSeries.length - 168);
	}

	public async getLatestHourlyTimeSeries(exchangeAccount: ExchangeAccount): Promise<Chart> {
		if (exchangeAccount.hourlyTimeslices === undefined) {
			exchangeAccount.hourlyTimeslices = new Map<number, ITimeslice>();
		}

		const timeslices: ITimeslice[] = Array.from(exchangeAccount.hourlyTimeslices.values());
		const latestHour = this.getLatestHour();

		// If this is already cached, we can just return it as is.
		if (timeslices.length > 0 && timeslices[timeslices.length - 1].start >= latestHour - ONE_HOUR) {
			return timeslices.map((entry) => ({
				timestamp: entry.start,
				value: { USD: entry.value.USD },
			}));
		}
		// Generate hourly time series for last 7 days (last whole hour and 167 previous hours)
		// If there is partial data available,
		// we will append the latest data and return the whole series.
		const assetIds = this.extractHoldingsIdsFromTimeslices(timeslices);
		return await this.loadLatestHourlyTimeSeries(exchangeAccount, assetIds, timeslices);
	}

	private async loadLatestHourlyTimeSeries(exchangeAccount: ExchangeAccount, assetIds: string[], timeslices: ITimeslice[]): Promise<Chart> {
		const hourlySlices: ITimeslices = new Map<number, ITimeslice>();
		const lastAmount: { [key: string]: number } = {};
		const lastPrice: { [key: string]: number } = {};
		const prices: { [key: string]: { [key: number]: IHistoricalPrice } } = {};
		let cachedHours = 0;
		let daysCached = 0;
		const latestHour = this.getLatestHour();
		const startOfToday = latestHour - (latestHour % ONE_DAY);
		const oneWeekAgo = latestHour - ONE_WEEK; // subtract 7 days (in milliseconds) to get one week ago

		for (let i = 0; i < assetIds.length; i++) {
			// Grab last week of hourly prices for each symbol in holdings
			const hourlyPrices =
				(await this.digitalAssetHistoryEntityGateway.getHourlyData(assetIds[i], oneWeekAgo - ONE_HOUR, latestHour)) || [];
			prices[assetIds[i]] = {};
			for (let j = 0; j < hourlyPrices.length; j++) {
				prices[assetIds[i]][hourlyPrices[j].timestamp] = hourlyPrices[j];
			}
		}

		if (timeslices[timeslices.length - 1].start < startOfToday) {
			throw 'The exchange account has not been synced';
		}
		if (timeslices.length < 8) {
			throw 'The exchange account does not have a full week of data.';
		}

		/// TODO: Check if we already have part of the hourly time series cached and only append new data
		let cachedHourlyTimeSeries: ITimeslice[] = [];
		if (exchangeAccount.hourlyTimeslices) {
			cachedHourlyTimeSeries = Object.values(exchangeAccount.hourlyTimeslices);
		}
		if (cachedHourlyTimeSeries && cachedHourlyTimeSeries.length > 0) {
			if (cachedHourlyTimeSeries[cachedHourlyTimeSeries.length - 1].start >= latestHour - ONE_HOUR) {
				return cachedHourlyTimeSeries.map((timeslice) => {
					return { timestamp: timeslice.start, value: { USD: timeslice.value.USD } };
				});
			}

			const lastHourCached = cachedHourlyTimeSeries[cachedHourlyTimeSeries.length - 1].start;
			const firstHourNeeded = oneWeekAgo - ONE_HOUR;
			if (lastHourCached >= firstHourNeeded) {
				// is the cached data within our range of required data?
				// start from the last index and go back however many hours are cached that we require
				const startIndex = cachedHourlyTimeSeries.length - (lastHourCached - firstHourNeeded) / ONE_HOUR;

				for (
					let i = startIndex;
					i < cachedHourlyTimeSeries.length;
					i++ // save the relevant cached hourly slices
				) {
					hourlySlices.set(cachedHourlyTimeSeries[i].start, cachedHourlyTimeSeries[i]);
					cachedHours++;
				}

				daysCached = ~~((lastHourCached + ONE_HOUR - timeslices[timeslices.length - 8].start) / ONE_DAY); // integer division to get days cached

				// initialize the holdings amounts and prices from the last hour cached
				for (const [key, value] of Object.entries(hourlySlices.get(lastHourCached)?.holdings || {})) {
					lastAmount[key] = value.amount;
					lastPrice[key] = value.price;
				}
			}
		} else if (timeslices.length >= 9) {
			// initialize the holdings amounts and prices from 8 days ago
			for (const [key, value] of Object.entries(timeslices[timeslices.length - 9].holdings)) {
				lastAmount[key] = value.amount;
				lastPrice[key] = value.price;
			}
		}

		for (let i = timeslices.length - 8 + daysCached; i < timeslices.length; i++) {
			const dailySlice = timeslices[i];
			let startOfDay = dailySlice.start;
			const endOfDay = Math.min(startOfDay + ONE_DAY, latestHour);
			const holdings = Array.from(dailySlice.holdings.values());
			const currentSnap: { [key: string]: number } = {};
			let firstPass = false;

			// set first day's start to the last cached hour
			if (i == timeslices.length - 8 + daysCached) {
				startOfDay = oneWeekAgo - ONE_HOUR + cachedHours * ONE_HOUR;
				if (cachedHours > 0) {
					firstPass = true;
				}
			}

			// initialize the current snapshots index for each holding to 0 for each daily slice
			for (const holding of holdings) {
				currentSnap[holding.assetId] = 0;
			}

			for (let hour = startOfDay; hour < endOfDay; hour += ONE_HOUR) {
				const hourlySlice: ITimeslice = {
					start: hour,
					value: { USD: 0 },
					holdings: new Map<string, IHoldingSlice>(),
				};
				const snapsInThisSlice: IHoldingSnapshot[] = [];

				for (let j = 0, holding = holdings[j]; j < holdings.length; holding = holdings[++j]) {
					const currentAsset = holding.assetId;
					for (let index = currentSnap[currentAsset]; index < holding.snapshots.length; index++) {
						const snap = holding.snapshots[index];
						if (snap.timestamp < hour + ONE_HOUR) {
							snapsInThisSlice.push(snap);
							lastAmount[currentAsset] = snap.total.amount.bought - snap.total.amount.sold;
							lastPrice[currentAsset] = snap.price.USD;
							currentSnap[currentAsset]++;
						} else {
							break;
						}
					}

					const hourlyPrice = prices[currentAsset][hour];
					if (hourlyPrice != undefined) {
						lastPrice[currentAsset] = hourlyPrice.price;
					}
					if (!lastAmount[currentAsset]) {
						lastAmount[currentAsset] = 0;
					}
					const value = lastAmount[currentAsset] * lastPrice[currentAsset];

					const hourlyHoldingSlice: IHoldingSlice = {
						assetId: currentAsset,
						amount: lastAmount[currentAsset],
						price: { USD: lastPrice[currentAsset] },
						value: { USD: value },
						snapshots: snapsInThisSlice,
					};

					hourlySlice.holdings.set(currentAsset, hourlyHoldingSlice);
					hourlySlice.value.USD += value;
				}

				if (firstPass) {
					firstPass = false;
				} else {
					hourlySlices.set(hour, hourlySlice);
				}
			}
		}

		exchangeAccount.hourlyTimeslices = hourlySlices;
		await this.exchangeAccountEntityGateway.updateExchangeAccount({ ...exchangeAccount, hourlyTimeslices: hourlySlices });

		return Object.entries(hourlySlices).map((entry: [string, ITimeslice]) => {
			return { timestamp: entry[1].start, value: { USD: entry[1].value.USD } };
		});
	}

	private extractHoldingsIdsFromTimeslices(timeslices: ITimeslice[]): string[] {
		const assetIds = new Set<string>();

		for (let i = 0; i < timeslices.length; i++) {
			const holdings = timeslices[i].holdings.values();
			for (const holding of holdings) {
				assetIds.add(holding.assetId);
			}
		}

		return Array.from(assetIds);
	}

	private getLatestHour(): number {
		const now = Date.now();
		const latestHour = now - (now % ONE_HOUR);
		return latestHour;
	}

	private combineCharts(charts: Chart[]): Chart {
		const metaChart: Chart = [];
		const metatimeslices: Map<number, number> = new Map<number, number>();

		for (const chart of charts) {
			for (const chartPoint of chart) {
				const currentValue = metatimeslices.get(chartPoint.timestamp) || 0;
				metatimeslices.set(chartPoint.timestamp, currentValue + chartPoint.value.USD);
			}
		}

		for (const timestamp of metatimeslices.keys()) {
			metaChart.push({ timestamp: timestamp, value: { USD: metatimeslices.get(timestamp) || 0 } });
		}

		return metaChart;
	}

	public getNumberOfDaysForTimespan(timeframe: Timespan): number {
		switch (timeframe) {
			case Timespan.ALL:
				return 100000000;
			case Timespan.M1:
				return 30;
			case Timespan.M3:
				return 90;
			case Timespan.M6:
				return 182;
			case Timespan.Y1:
				return 365;
			default:
				return 0;
		}
	}
}

export default GetMetaportfolioChartUseCase;
