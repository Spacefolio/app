import { IExchange } from '.';
import { BaseIntegration, IDigitalAsset, IHolding, IHoldingBalance, IIntegration, IOrder, ITimeslices } from '..';
import { NullHoldingBalance, NullHoldingTotal } from '../Holding';
import { IHoldingSnapshot } from '../HoldingSnapshot';
import HoldingsSnapshots from '../HoldingsSnapshots';
import { IDigitalAssetTransaction } from '../Transaction';
import { Balances } from './Exchange';

export interface IExchangeCredentials {
	apiKey?: string;
	apiSecret?: string;
	passphrase?: string;
	uid?: string;
	login?: string;
	privateKey?: string;
	walletAddress?: string;
	token?: string;
}

export interface IExchangeAccount extends IIntegration {
	accountId: string;
	exchange: IExchange;
	credentials: IExchangeCredentials;
	transactions: IDigitalAssetTransaction[];
	orders: IOrder[];
	openOrders: IOrder[];
	holdings: IHolding[];
	dailyTimeslices: ITimeslices;
	hourlyTimeslices: ITimeslices;
	lastSynced: Date;
}

export type GetAssetHandler = (assetId: string) => Promise<IDigitalAsset>;
export type GetRateHandler = (base: string, baseSymbol: string, quote: string, quoteSymbol: string, timestamp: number) => Promise<number>;

export class ExchangeAccount extends BaseIntegration implements IExchangeAccount {
	public accountId: string;
	public exchange: IExchange;
	public credentials: IExchangeCredentials;
	public transactions: IDigitalAssetTransaction[];
	public orders: IOrder[];
	public openOrders: IOrder[];
	public lastSynced: Date;
	public dailyTimeslices: ITimeslices;
	public hourlyTimeslices: ITimeslices;

	protected constructor(exchangeAccount: IExchangeAccount) {
		super(exchangeAccount);
		this.accountId = exchangeAccount.accountId;
		this.exchange = exchangeAccount.exchange;
		this.credentials = exchangeAccount.credentials;
		this.transactions = exchangeAccount.transactions;
		this.orders = exchangeAccount.orders;
		this.openOrders = exchangeAccount.openOrders;
		this.lastSynced = exchangeAccount.lastSynced;
		this.dailyTimeslices = exchangeAccount.dailyTimeslices;
		this.hourlyTimeslices = exchangeAccount.hourlyTimeslices;
	}

	async createUpdatedOrders(orders: IOrder[]): Promise<IOrder[]> {
		return new Array<IOrder>(...this.orders.values(), ...orders);
	}

	async createUpdatedTransactions(transactions: IDigitalAssetTransaction[]): Promise<IDigitalAssetTransaction[]> {
		return new Array<IDigitalAssetTransaction>(...this.transactions.values(), ...transactions);
	}

	async createUpdatedHoldings(
		orders: IOrder[],
		transactions: IDigitalAssetTransaction[],
		balances: Balances,
		getAsset: GetAssetHandler,
		getRate: GetRateHandler
	): Promise<IHolding[]> {
		const holdingsSnapshots: HoldingsSnapshots = await this.createHoldingsSnapshots(orders, transactions, balances, getRate);

		for (const holding of holdingsSnapshots.getSnapshots()) {
			const asset = await getAsset(holding.asset);
			const balance: IHoldingBalance = balances[holding.asset] || new NullHoldingBalance();

			if (this.isNewHolding(holding.asset)) {
				await this.createHolding(asset, holding.snapshots, balance);
			} else {
				await this.updateHolding(asset, holding.snapshots, balance);
			}
		}

		return this.holdings;
	}

	async createDailyTimeslices(): Promise<ITimeslices> {
		return {};
	}

	async createHourlyTimeslices(): Promise<ITimeslices> {
		return {};
	}

	async createHoldingsSnapshots(
		orders: IOrder[],
		transactions: IDigitalAssetTransaction[],
		balances: Balances,
		getRate: GetRateHandler
	): Promise<HoldingsSnapshots> {
		const oldSnapshots: { [assetId: string]: IHoldingSnapshot[] } = {};
		this.holdings.forEach((holding) => {
			oldSnapshots[holding.asset.assetId] = holding.snapshots;
		});

		const holdingsSnapshots = new HoldingsSnapshots(orders, transactions, balances, oldSnapshots, getRate);
		await holdingsSnapshots.createSnapshots();
		return holdingsSnapshots;
	}

	async createHolding(asset: IDigitalAsset, snapshots: IHoldingSnapshot[], balance: IHoldingBalance): Promise<void> {
		let lastSnapshot;
		if (snapshots.length > 0) {
			lastSnapshot = snapshots[snapshots.length - 1];
		}

		const holding: IHolding = {
			asset: {
				assetId: asset.assetId,
				symbol: asset.symbol,
				name: asset.name,
				image: asset.image
			},
			price: { USD: asset.currentPrice },
			balance,
			value: { USD: balance.total * asset.currentPrice },
			total: lastSnapshot?.total || new NullHoldingTotal(),
			snapshots,
		};

		this.holdings.push(holding);
	}

	async updateHolding(asset: IDigitalAsset, snapshots: IHoldingSnapshot[], balance: IHoldingBalance): Promise<void> {
		const oldHolding = this.holdings.find((holding) => holding.asset.assetId === asset.assetId);

		if (!oldHolding) return;

		const last = snapshots[snapshots.length - 1].total;

		oldHolding.balance = balance;
		oldHolding.asset = {
			assetId: asset.assetId,
			symbol: asset.symbol,
			name: asset.name,
			image: asset.image
		};
		oldHolding.price.USD = asset.currentPrice;
		oldHolding.snapshots.push(...snapshots);
		oldHolding.total = {
			amount: {
				bought: last.amount.bought,
				sold: last.amount.sold,
				deposited: last.amount.deposited,
				withdrawn: last.amount.withdrawn
			},
			value: {
				bought: { USD: last.value.bought.USD },
				sold: { USD: last.value.sold.USD },
				deposited: { USD: last.value.deposited.USD },
				withdrawn: { USD: last.value.withdrawn.USD },
			},
			averageBuyPrice: { USD: last.averageBuyPrice.USD },
			averageSellPrice: { USD: last.averageSellPrice.USD },
			fees: { USD: last.fees.USD }
		}
		oldHolding.value = { USD: balance.total * asset.currentPrice };
	}

	isNewHolding(assetId: string): boolean {
		return !this.holdings.some((holding) => {
			return holding.asset.assetId === assetId;
		});
	}

	static buildMakeExchangeAccount() {
		return function makeExchangeAccount(exchangeAccountParams: IExchangeAccount): ExchangeAccount {
			return new ExchangeAccount(exchangeAccountParams);
		};
	}
}

export default ExchangeAccount.buildMakeExchangeAccount;
