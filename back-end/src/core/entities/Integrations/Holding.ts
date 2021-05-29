import { IAsset } from '.';
import { IHoldingSnapshot } from './HoldingSnapshot';

export interface IHoldingBalance {
	free: number;
	used: number;
	total: number;
}

export class NullHoldingBalance implements IHoldingBalance {
	free = 0;
	used = 0;
	total = 0;
}

export interface IValue {
	USD: number;
}

export interface IHoldingTotal {
	amount: IAmounts;
	value: IValues;
	averageBuyPrice: IValue;
	averageSellPrice: IValue;
	fees: IValue;
}

export class NullHoldingTotal implements IHoldingTotal {
	amount = {
		deposited: 0,
		withdrawn: 0,
		bought: 0,
		sold: 0,
	};

	value = {
		deposited: { USD: 0 },
		withdrawn: { USD: 0 },
		bought: { USD: 0 },
		sold: { USD: 0 },
	};

	averageBuyPrice = { USD: 0 };
	averageSellPrice = { USD: 0 };

	fees = {
		USD: 0,
	};
}

export interface IAmounts {
	deposited: number;
	withdrawn: number;
	bought: number;
	sold: number;
}

export interface IValues {
	deposited: IValue;
	withdrawn: IValue;
	bought: IValue;
	sold: IValue;
}

export interface IHolding {
	asset: IAsset;
	balance: IHoldingBalance;
	price: IValue;
	value: IValue;
	total: IHoldingTotal;
	snapshots: IHoldingSnapshot[];
}

export class Holding implements IHolding {
	public readonly asset: IAsset;
	public readonly balance: IHoldingBalance;
	public readonly price: IValue;
	public readonly value: IValue;
	public readonly total: IHoldingTotal;
	public readonly snapshots: IHoldingSnapshot[];

	protected constructor(holding: IHolding) {
		this.asset = holding.asset;
		this.balance = holding.balance;
		this.price = holding.price;
		this.value = holding.value;
		this.total = holding.total;
		this.snapshots = holding.snapshots;
	}

	static buildMakeHolding() {
		return function makeHolding(holdingParams: IHolding): Holding {
			return new Holding(holdingParams);
		};
	}
}

export default Holding.buildMakeHolding;
