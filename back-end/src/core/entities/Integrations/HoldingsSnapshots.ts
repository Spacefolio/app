import { IOrder } from '.';
import { Currency } from './Currency';
import { Balances } from './Exchanges/Exchange';
import { GetRateHandler } from './Exchanges/ExchangeAccount';
import { HoldingSnapshot, IHoldingSnapshot } from './HoldingSnapshot';
import { isOrder } from './Order';
import { IDigitalAssetTransaction } from './Transaction';

class HoldingsSnapshots {
	private snapshots: { [assetId: string]: IHoldingSnapshot[] };

	constructor(
		private orders: IOrder[],
		private transactions: IDigitalAssetTransaction[],
		private balances: Balances,
		private oldSnapshots: { [assetId: string]: IHoldingSnapshot[] },
		private getRate: GetRateHandler
	) {
		this.snapshots = {};
	}

	getSnapshots(): { asset: string, snapshots: IHoldingSnapshot[] }[] {
		return Object.entries(this.snapshots).map((entry) => {
			return {
				asset: entry[0],
				snapshots: entry[1]
			}
		});
	}

	async createSnapshots(): Promise<void> {
		const chronologically = (a: IDigitalAssetTransaction | IOrder, b: typeof a) => a.timestamp - b.timestamp;
		const actions = [...this.orders, ...this.transactions].sort(chronologically);

		for (const action of actions) {
			if (isOrder(action)) {
				await this.addOrderSnapshot(action as IOrder);
			} else {
				await this.addTransactionSnapshot(action as IDigitalAssetTransaction);
			}
		}
	}

	async addOrderSnapshot(order: IOrder): Promise<void> {
		const base = order.baseAsset;
		const quote = order.quoteAsset;
		const quoteSymbol = order.quoteSymbol;
		const quoteToUsd = await this.getRate(quote, quoteSymbol, Currency.USD, Currency.USD, order.timestamp);

		if (this.isNewHolding(base)) this.snapshots[base] = [];
    if (this.isNewHolding(quote)) this.snapshots[quote] = [];

    const lastSnapshotBase = this.getLastSnapshotFor(base);
    const lastSnapshotQuote = this.getLastSnapshotFor(quote);

		const baseSnapshot = new HoldingSnapshot(order.timestamp, order.side);
		const quoteSnapshot = baseSnapshot.populateOrder(lastSnapshotBase, lastSnapshotQuote, order, quoteToUsd);

		this.snapshots[base].push(baseSnapshot);
    this.snapshots[quote].push(quoteSnapshot);
	}

	async addTransactionSnapshot(transaction: IDigitalAssetTransaction): Promise<void> {
    const asset = transaction.assetId;
    const timestamp = transaction.timestamp;
		const priceInUsd = await this.getRate(asset, transaction.symbol, Currency.USD, Currency.USD, timestamp);
    
    if (this.isNewHolding(asset)) this.snapshots[asset] = [];

    const lastSnapshot = this.getLastSnapshotFor(asset);
    const snapshot = new HoldingSnapshot(timestamp, transaction.type);
    snapshot.populateTransaction(lastSnapshot, transaction, priceInUsd);

    this.snapshots[asset].push(snapshot);
  }

	private isNewHolding(assetId: string) {
		return !!!this.snapshots[assetId];
	}

	private getLastSnapshotFor(assetId: string): IHoldingSnapshot {
		const snaps = this.snapshots[assetId];
		if (snaps?.length > 0) {
			return snaps[snaps.length - 1];
		}
		const oldSnaps = this.oldSnapshots[assetId];
		if (oldSnaps?.length > 0) {
			return oldSnaps[oldSnaps.length - 1];
		}
    return new HoldingSnapshot();
	}
}

export default HoldingsSnapshots;
