import { Action, IDigitalAssetTransaction } from '.';
import { IFee } from './Transaction';

export enum OrderStatus {
	OPEN = 'open',
	CLOSED = 'closed',
	CANCELED = 'canceled',
}

export interface IOrder {
	timestamp: number;
	datetime: string;
	baseAsset: string;
	quoteAsset: string;
	side: Action.BUY | Action.SELL;
	price: number;
	amount: number;
	filled: number;
	remaining: number;
	cost: number;
	status: OrderStatus;
	fee: IFee;
}

export function isOrder(action: IOrder | IDigitalAssetTransaction): boolean {
	return action.hasOwnProperty('side');
}
