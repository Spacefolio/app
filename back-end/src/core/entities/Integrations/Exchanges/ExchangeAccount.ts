import { IExchange } from ".";
import { BaseIntegration, IHolding, IIntegration, IOrder, ITimeslices } from "..";
import HoldingsSnapshots from "../HoldingsSnapshots";
import { IDigitalAssetTransaction } from "../Transaction";
import { Balances, BaseExchange } from "./Exchange";

export interface IExchangeCredentials {
  apiKey?: string;
  apiSecret?: string;
  passphrase?: string;
  uid?: string;
  login?: string;
  privateKey?: string;
  walletAddress?: string;
  token?: string;
}

export interface IExchangeAccount extends IIntegration {
  accountId: string;
  exchange: IExchange;
  credentials: IExchangeCredentials;
  transactions: IDigitalAssetTransaction[];
  orders: IOrder[];
  openOrders: IOrder[];
  holdings: IHolding[];
  dailyTimeslices: ITimeslices;
  hourlyTimeslices: ITimeslices;
  lastSynced: Date;
}

export class ExchangeAccount extends BaseIntegration implements IExchangeAccount {
  public accountId: string;
  public exchange: IExchange;
  public credentials: IExchangeCredentials;
  public transactions: IDigitalAssetTransaction[];
  public orders: IOrder[];
  public openOrders: IOrder[];
  public lastSynced: Date;
  public dailyTimeslices: ITimeslices;
  public hourlyTimeslices: ITimeslices;

  protected constructor(exchangeAccount: IExchangeAccount) {
    super(exchangeAccount);
    this.accountId = exchangeAccount.accountId;
    this.exchange = exchangeAccount.exchange;
    this.credentials = exchangeAccount.credentials;
    this.transactions = exchangeAccount.transactions;
    this.orders = exchangeAccount.orders;
    this.openOrders = exchangeAccount.openOrders;
    this.lastSynced = exchangeAccount.lastSynced;
    this.dailyTimeslices = exchangeAccount.dailyTimeslices;
    this.hourlyTimeslices = exchangeAccount.hourlyTimeslices;
  }

  async createUpdatedOrders(orders: IOrder[]): Promise<IOrder[]> {
    return new Array<IOrder>(...this.orders.values(), ...orders);
  }

  async createUpdatedTransactions(transactions: IDigitalAssetTransaction[]): Promise<IDigitalAssetTransaction[]> {
    return new Array<IDigitalAssetTransaction>(...this.transactions.values(), ...transactions);
  }

  async createUpdatedHoldings(exchange: BaseExchange, orders: IOrder[], transactions: IDigitalAssetTransaction[], balances: Balances): Promise<IHolding[]> {
    const holdings: IHolding[] = [];

    const holdingsSnapshots: HoldingsSnapshots = await this.createHoldingsSnapshots(exchange, orders, transactions, balances);
    
    console.log(holdingsSnapshots);

    return holdings;
	}

  async createDailyTimeslices(): Promise<ITimeslices> {
    return {};
  }

  async createHourlyTimeslices(): Promise<ITimeslices> {
    return {};
  }

  async createHoldingsSnapshots(exchange: BaseExchange, orders: IOrder[], transactions: IDigitalAssetTransaction[], balances: Balances): Promise<HoldingsSnapshots> {
    const holdingsSnapshots = new HoldingsSnapshots(exchange, orders, transactions, balances);
    await holdingsSnapshots.createSnapshots();
    return holdingsSnapshots;
  }
  
  static buildMakeExchangeAccount() {
    return function makeExchangeAccount(exchangeAccountParams: IExchangeAccount): ExchangeAccount
    {
      return new ExchangeAccount(exchangeAccountParams);
    }
  }
}

export default ExchangeAccount.buildMakeExchangeAccount;