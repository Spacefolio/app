import { ExchangeAccountNotFound, IExchangeAccountEntityGateway, SyncExchangeAccountInvalidRequest, SyncExchangeAccountRequest } from '..';
import { IUseCase, Result } from '../../../../definitions';
import { BaseExchange, Exchange, ExchangeAccount, IOrder, OrderStatus, User } from '../../../../entities';
import { Balances } from '../../../../entities/Integrations/Exchanges/Exchange';
import { IDigitalAssetTransaction } from '../../../../entities/Integrations/Transaction';
import { IUserEntityGateway, UserNotFound } from '../../../user';
import { IUpdateExchangeAccountPayload } from '../ExchangeAccountEntityGateway';
import { ExchangeAccountSyncFailed } from './errors';
import SyncExchangeAccountResponse from './SyncExchangeAccountResponse';

export type GetExchangeHandler = (exchange: Exchange) => BaseExchange;

class SyncExchangeAccountUseCase implements IUseCase<SyncExchangeAccountRequest, SyncExchangeAccountResponse> {
	private userEntityGateway: IUserEntityGateway;
	private exchangeAccountEntityGateway: IExchangeAccountEntityGateway;
	private getExchange: GetExchangeHandler;

	constructor(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway,
		getExchange: GetExchangeHandler
	) {
		this.userEntityGateway = userEntityGateway;
		this.exchangeAccountEntityGateway = exchangeAccountEntityGateway;
		this.getExchange = getExchange;
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

		exchange.setAccount(exchangeAccount);

		let balances: Balances;
		let transactions: IDigitalAssetTransaction[];
		let orders: IOrder[];
		let openOrders: IOrder[];

		try {
			balances = await exchange.fetchBalances();
			transactions = await exchange.fetchTransactions();
			orders = await exchange.fetchOrders();
			openOrders = await exchange.fetchOpenOrders();
		} catch {
			return Result.fail(new ExchangeAccountSyncFailed(exchangeAccount.accountId));
		}

		orders = orders.filter((order) => order.status === OrderStatus.CLOSED);

		const updatedOrders = await exchangeAccount.createUpdatedOrders(orders);
		const updatedTransactions = await exchangeAccount.createUpdatedTransactions(transactions);
		const updatedHoldings = await exchangeAccount.createUpdatedHoldings(exchange, updatedOrders, updatedTransactions, balances);
		const dailyTimeslices = await exchangeAccount.createDailyTimeslices();
		const hourlyTimeslices = await exchangeAccount.createHourlyTimeslices();

		const updatePayload: IUpdateExchangeAccountPayload = {
			accountId: exchangeAccount.accountId,
			orders: updatedOrders,
			openOrders,
			transactions: updatedTransactions,
			holdings: updatedHoldings,
			dailyTimeslices,
			hourlyTimeslices
		};

		const updatedAccount = await this.exchangeAccountEntityGateway.updateExchangeAccount(updatePayload);

		if (!updatedAccount) {
			return Result.fail(new ExchangeAccountSyncFailed(exchangeAccount.accountId));
		}

		return Result.ok<ExchangeAccount>(updatedAccount);
	}
}

export default SyncExchangeAccountUseCase;
