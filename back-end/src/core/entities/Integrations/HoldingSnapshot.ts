import { Action } from '.';
import { IHoldingTotal, IValue } from './Holding';
import { IOrder } from './Order';
import { IDigitalAssetTransaction } from './Transaction';

export interface IAmountAndValue {
	amount: number;
	value: IValue;
}

export interface IHoldingSnapshot {
	timestamp: number;
	price: IValue;
	amountHeld: number;
	valueHeld: IValue;
	action: Action;
	deposited?: IAmountAndValue;
	withdrew?: IAmountAndValue;
	bought?: IAmountAndValue;
	sold?: IAmountAndValue;
	total: IHoldingTotal;
}

export class HoldingSnapshot implements IHoldingSnapshot {
	timestamp: number;
	price: IValue;
	amountHeld: number;
	valueHeld: IValue;
	deposited?: IAmountAndValue | undefined;
	withdrew?: IAmountAndValue | undefined;
	bought?: IAmountAndValue | undefined;
	sold?: IAmountAndValue | undefined;
	total: IHoldingTotal;
	action: Action;

	constructor(timestamp?: number, action?: Action) {
		this.timestamp = timestamp || 0;
		this.price = { USD: 0 };
		this.amountHeld = 0;
		this.valueHeld = { USD: 0 };
		this.total = {
			amount: {
				deposited: 0,
				withdrawn: 0,
				bought: 0,
				sold: 0,
			},
			value: {
				deposited: { USD: 0 },
				withdrawn: { USD: 0 },
				bought: { USD: 0 },
				sold: { USD: 0 },
			},
			averageBuyPrice: { USD: 0 },
			averageSellPrice: { USD: 0 },
			fees: { USD: 0 },
		};
		this.action = action || Action.BUY;
	}

	populateOrder(
		lastSnapshotBase: IHoldingSnapshot,
		lastSnapshotQuote: IHoldingSnapshot,
		order: IOrder,
		quoteToUsd: number
	): HoldingSnapshot {
		this.total = this.copyTotal(lastSnapshotBase.total);
		this.price.USD = order.price ? order.price * quoteToUsd : (order.cost / order.filled) * quoteToUsd;

		if (this.action === Action.BUY) {
			this.bought = {
				amount: order.filled,
				value: { USD: this.price.USD * order.filled },
			};

			this.total.amount.bought += this.bought.amount;
			this.total.value.bought.USD += this.bought.value.USD;
			this.total.averageBuyPrice.USD = this.total.value.bought.USD / this.total.amount.bought;
			this.total.fees.USD += order.fee.cost * quoteToUsd;

			this.amountHeld = lastSnapshotBase.amountHeld + this.bought.amount;
			this.valueHeld.USD = this.amountHeld * this.price.USD;
		} else {
			this.sold = {
				amount: order.filled,
				value: { USD: (order.cost - order.fee.cost) * quoteToUsd },
			};

			this.total.amount.sold += this.sold.amount;
			this.total.value.sold.USD += this.sold.value.USD;
			this.total.averageSellPrice.USD = this.total.value.sold.USD / this.total.amount.sold;
			this.total.fees.USD += order.fee.cost * quoteToUsd;

			this.amountHeld = lastSnapshotBase.amountHeld - this.sold.amount;
			this.valueHeld.USD = this.amountHeld * this.price.USD;
		}

		const snapshotQuote = new HoldingSnapshot(order.timestamp, this.action);
		snapshotQuote.total = this.copyTotal(lastSnapshotQuote.total);
		snapshotQuote.price.USD = quoteToUsd;
		const orderCostWithFee = order.cost + order.fee.cost;

		if (this.action === Action.BUY) {
			// Counts as a sale of the quote currency
			snapshotQuote.action = Action.SELL;
			snapshotQuote.sold = {
				amount: orderCostWithFee,
				value: { USD: order.cost * quoteToUsd },
			};

			snapshotQuote.total.amount.sold += snapshotQuote.sold.amount;
			snapshotQuote.total.value.sold.USD += snapshotQuote.sold.value.USD;
			snapshotQuote.total.averageSellPrice.USD = snapshotQuote.total.value.sold.USD / snapshotQuote.total.amount.sold;

			snapshotQuote.amountHeld = lastSnapshotQuote.amountHeld - snapshotQuote.sold.amount;
			snapshotQuote.valueHeld.USD = snapshotQuote.amountHeld * quoteToUsd;
		} /* this.action === Action.SELL */ else {
			// Counts as a buy of the quote currency
			snapshotQuote.action = Action.BUY;
			snapshotQuote.bought = {
				amount: order.cost - order.fee.cost,
				value: { USD: (order.cost - order.fee.cost) * quoteToUsd },
			};

			snapshotQuote.total.amount.bought += snapshotQuote.bought.amount;
			snapshotQuote.total.value.bought.USD += snapshotQuote.bought.value.USD;
			snapshotQuote.total.averageBuyPrice.USD = snapshotQuote.total.value.bought.USD / snapshotQuote.total.amount.bought;

			snapshotQuote.amountHeld = lastSnapshotQuote.amountHeld + snapshotQuote.bought.amount;
			snapshotQuote.valueHeld.USD = snapshotQuote.amountHeld * quoteToUsd;
		}

		return snapshotQuote;
	}

	populateTransaction(lastSnapshot: IHoldingSnapshot, transaction: IDigitalAssetTransaction, priceInUsd: number): void {
		const fee = transaction.fee ? transaction.fee.cost : 0;
		const amount = transaction.amount;

		this.price = { USD: priceInUsd };
		this.total = this.copyTotal(lastSnapshot.total);

		if (this.action === Action.DEPOSIT) {
			this.deposited = {
				amount,
				value: { USD: amount * priceInUsd },
			};

			this.total.amount.deposited += amount;
			this.total.value.deposited.USD += this.deposited.value.USD;
			this.amountHeld = lastSnapshot.amountHeld + this.deposited.amount;
			this.valueHeld.USD = this.amountHeld * priceInUsd;
		} else {
			// this.action === Action.WITHDRAW
			this.withdrew = {
				amount: amount + fee,
				value: { USD: (amount - fee) * priceInUsd },
			};

			this.total.amount.withdrawn += this.withdrew.amount;
			this.total.value.withdrawn.USD += this.withdrew.value.USD;
			this.amountHeld = lastSnapshot.amountHeld - this.withdrew.amount;
			this.valueHeld.USD = this.amountHeld * priceInUsd;
		}
	}

	private copyTotal(total: IHoldingTotal): IHoldingTotal {
		return {
			amount: {
				bought: total.amount.bought,
				sold: total.amount.sold,
				withdrawn: total.amount.withdrawn,
				deposited: total.amount.deposited
			},
			value: {
				bought: { USD: total.value.bought.USD },
				sold: { USD: total.value.sold.USD },
				deposited: { USD: total.value.deposited.USD },
				withdrawn: { USD: total.value.withdrawn.USD }
			},
			averageBuyPrice: { USD: total.averageBuyPrice.USD },
			averageSellPrice: { USD: total.averageSellPrice.USD },
			fees: { USD: total.fees.USD }
		};
	}
}
