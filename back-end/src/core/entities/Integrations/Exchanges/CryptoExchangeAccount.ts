import { IExchangeAccount, ExchangeAccount } from ".";

/*
export interface ICryptoExchangeAccount extends IExchangeAccount {

}
*/

export abstract class CryptoExchangeAccount extends ExchangeAccount {
  
  protected constructor(exchangeAccount: IExchangeAccount) {
    super(exchangeAccount);
  }
}