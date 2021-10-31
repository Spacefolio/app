import { Exchange, IExchangeCredentials } from '../../../core/entities';
import ccxt, { Exchange as ExchangeAccess } from 'ccxt';

class CcxtService {
	public static async verifyCredentials(exchange: Exchange, credentials: IExchangeCredentials): Promise<boolean> {
		const exchangeAccess = this.createExchangeAccess(exchange, credentials);

		try {
			exchangeAccess.checkRequiredCredentials();
			await exchangeAccess.fetchBalance();
		} catch (e) {
			console.log(e);
			return false;
		}

		return true;
	}

	public static createExchangeAccess(exchange: Exchange, credentials: IExchangeCredentials): ExchangeAccess {
		if (exchange == Exchange.FAKE) exchange = Exchange.COINBASE;
		const exchangeClass = ccxt[exchange];
		const exchangeAccess = new exchangeClass({
			apiKey: credentials.apiKey,
			secret: credentials.secret,
			password: credentials.password,
			uid: credentials.uid,
			login: credentials.login,
			privateKey: credentials.privateKey,
			walletAddress: credentials.walletAddress,
			token: credentials.token,
			timeout: 5000,
			enableRateLimit: false,
		});

		return exchangeAccess;
	}
}

export default CcxtService;
