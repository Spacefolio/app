import { ExchangeAccountNotFound, IExchangeAccountEntityGateway, SyncExchangeAccountInvalidRequest, SyncExchangeAccountRequest } from '..';
import { IUseCase, Result } from '../../../../definitions';
import { BaseExchange, Exchange, ExchangeAccount, IDigitalAsset, IOrder, OrderStatus, User } from '../../../../entities';
import { IHistoricalPrice, NullAsset } from '../../../../entities/Integrations/Asset';
import Timeslices from '../../../../entities/Integrations/Timeslices';
import { Balances } from '../../../../entities/Integrations/Exchanges/Exchange';
import { GetRateHandler } from '../../../../entities/Integrations/Exchanges/ExchangeAccount';
import { IDigitalAssetTransaction } from '../../../../entities/Integrations/Transaction';
import { IUserEntityGateway, UserNotFound } from '../../../user';
import { IDigitalAssetEntityGateway, IDigitalAssetHistoryEntityGateway } from '../../digitalAsset';
import { IUpdateExchangeAccountPayload } from '../ExchangeAccountEntityGateway';
import { ExchangeAccountSyncFailed } from './errors';
import SyncExchangeAccountResponse from './SyncExchangeAccountResponse';

export type GetExchangeHandler = (exchange: Exchange) => BaseExchange;

class SyncExchangeAccountUseCase implements IUseCase<SyncExchangeAccountRequest, SyncExchangeAccountResponse> {
	private userEntityGateway: IUserEntityGateway;
	private exchangeAccountEntityGateway: IExchangeAccountEntityGateway;
	private digitalAssetEntityGateway: IDigitalAssetEntityGateway;
	private digitalAssetHistoryEntityGateway: IDigitalAssetHistoryEntityGateway;
	private getExchange: GetExchangeHandler;

	constructor(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway,
		digitalAssetEntityGateway: IDigitalAssetEntityGateway,
		digitalAssetHistoryEntityGateway: IDigitalAssetHistoryEntityGateway,
		getExchange: GetExchangeHandler
	) {
		this.userEntityGateway = userEntityGateway;
		this.exchangeAccountEntityGateway = exchangeAccountEntityGateway;
		this.digitalAssetEntityGateway = digitalAssetEntityGateway;
		this.digitalAssetHistoryEntityGateway = digitalAssetHistoryEntityGateway;
		this.getExchange = getExchange;
		this.getRate = this.getRate.bind(this);
		this.getHistoricalValues = this.getHistoricalValues.bind(this);
		this.getHourlyData = this.getHourlyData.bind(this);
	}

	async execute(request: SyncExchangeAccountRequest): Promise<SyncExchangeAccountResponse> {
		if (!request || !request.email || !request.accountId) {
			return Result.fail(new SyncExchangeAccountInvalidRequest(request));
		}

		const user: User | undefined = await this.userEntityGateway.getUser(request.email);

		if (!user) {
			return Result.fail(new UserNotFound(request.email));
		}

		const accountMatches = (account: ExchangeAccount) => account.accountId === request.accountId;
		const userHasThisAccount = user.exchangeAccounts.some(accountMatches);
		if (!userHasThisAccount) {
			return Result.fail(new ExchangeAccountNotFound(request.accountId));
		}

		const exchangeAccount = await this.exchangeAccountEntityGateway.getExchangeAccount(request.accountId);

		if (!exchangeAccount) {
			return Result.fail(new ExchangeAccountNotFound(request.accountId));
		}

		const exchangeName = <Exchange>exchangeAccount.exchange.id;
		const exchange = this.getExchange(exchangeName);

		const getRate: GetRateHandler = (base: string, baseSymbol: string, quote: string, quoteSymbol: string, timestamp: number) => {
			return this.getRate(exchange, base, baseSymbol, quote, quoteSymbol, timestamp);
		};

		let balances: Balances;
		let transactions: IDigitalAssetTransaction[];
		let orders: IOrder[];
		let openOrders: IOrder[];

		try {
			balances = await exchange.fetchBalances(exchangeAccount);
			transactions = await exchange.fetchTransactions(exchangeAccount);
			orders = await exchange.fetchOrders(exchangeAccount);
			openOrders = await exchange.fetchOpenOrders(exchangeAccount);
		} catch {
			return Result.fail(new ExchangeAccountSyncFailed(exchangeAccount.accountId));
		}

		orders = orders.filter((order) => order.status === OrderStatus.CLOSED);

		const updatedOrders = await exchangeAccount.createUpdatedOrders(orders);
		const updatedTransactions = await exchangeAccount.createUpdatedTransactions(transactions);
		const updatedHoldings = await exchangeAccount.createUpdatedHoldings(
			orders,
			transactions,
			balances,
			this.getAsset.bind(this),
			getRate.bind(this)
		);
		
		const dailyTimeslices = await Timeslices.createDailyTimeslices(updatedHoldings, exchangeAccount.dailyTimeslices, exchangeAccount.lastSynced, this.getHistoricalValues);
		const hourlyTimeslices = await Timeslices.createHourlyTimeslices(exchangeAccount.hourlyTimeslices, dailyTimeslices, this.getHourlyData);

		const updatePayload: IUpdateExchangeAccountPayload = {
			accountId: exchangeAccount.accountId,
			orders: updatedOrders,
			openOrders,
			transactions: updatedTransactions,
			holdings: updatedHoldings,
			dailyTimeslices,
			hourlyTimeslices,
		};

		const updatedAccount = await this.exchangeAccountEntityGateway.updateExchangeAccount(updatePayload);

		if (!updatedAccount) {
			return Result.fail(new ExchangeAccountSyncFailed(exchangeAccount.accountId));
		}

		return Result.ok<ExchangeAccount>(updatedAccount);
	}

	async getAsset(assetId: string): Promise<IDigitalAsset> {
		const asset = await this.digitalAssetEntityGateway.getDigitalAsset(assetId);
		if (asset) return asset;
		return new NullAsset(assetId);
	}

	async getRate(
		exchange: BaseExchange,
		base: string,
		baseSymbol: string,
		quote: string,
		quoteSymbol: string,
		timestamp: number
	): Promise<number> {
		const rate = await exchange.getRate(baseSymbol, quoteSymbol, timestamp);
		if (rate) return rate;

		const historicalPrice = await this.digitalAssetHistoryEntityGateway.getHistoricalValue(base, timestamp);
		if (historicalPrice) return historicalPrice.price;

		return 0;
	}

	async getHistoricalValues(assetId: string, from: number, to: number): Promise<IHistoricalPrice[]> {
		const historicalValues = await this.digitalAssetHistoryEntityGateway.getHistoricalValues(assetId, from, to);
		return historicalValues || [];
	}

	async getHourlyData(assetId: string, from: number, to: number): Promise<IHistoricalPrice[]> {
		const hourlyData = await this.digitalAssetHistoryEntityGateway.getHourlyData(assetId, from, to);
		return hourlyData || [];
	}
}

export default SyncExchangeAccountUseCase;
