import { Exchange, IExchangeCredentials } from "../../../core/entities";
import ccxt, { Exchange as ExchangeAccess } from 'ccxt';

class CcxtService {
  public static async verifyCredentials(exchange: Exchange, credentials: IExchangeCredentials): Promise<boolean> {
    const exchangeAccess = this.createExchangeAccess(exchange, credentials);
    
    try {
      exchangeAccess.checkRequiredCredentials();
      await exchangeAccess.fetchMyTrades(undefined, Date.now());
    } catch {
      return false;
    }
    
    return true;
  }

  public static createExchangeAccess(exchange: Exchange, credentials: IExchangeCredentials): ExchangeAccess {
    const exchangeClass = ccxt[exchange];
    const exchangeAccess = new exchangeClass({
      apiKey: credentials.apiKey,
      secret: credentials.apiSecret,
      password: credentials.passphrase,
      uid: credentials.uid,
      login: credentials.login,
      privateKey: credentials.privateKey,
      walletAddress: credentials.walletAddress,
      token: credentials.token,
      timeout: 2000,
      enableRateLimit: false,
    });

    return exchangeAccess;
  }
}

export default CcxtService;