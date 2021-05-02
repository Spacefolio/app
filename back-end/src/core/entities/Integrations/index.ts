export { IIntegration, BaseIntegration } from './Integration';
export {
	BaseExchange,
	IExchangeAccount,
	ExchangeAccount,
	IExchangeCredentials,
	IExchange,
	Exchange,
	ExchangeNames,
	makeExchangeAccount,
} from './Exchanges';
export { ITransaction, TransactionType } from './Transaction';
export { IAsset, IDigitalAsset } from './Asset';
export { IHolding, IHoldingTotal, IHoldingBalance, IAmounts, IValues, IValue } from './Holding';
import buildMakeHolding from './Holding';
export const makeHolding = buildMakeHolding();
