export { IExchange, BaseExchange, Exchange, ExchangeNames, IExchangeAdapter } from './Exchange';
export { IExchangeAccount, ExchangeAccount, IExchangeCredentials } from './ExchangeAccount';
import buildMakeExchangeAccount from './ExchangeAccount';
export const makeExchangeAccount = buildMakeExchangeAccount();
