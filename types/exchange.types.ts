export interface IExchangeAccount {
  id: string;
  apiKey: string;
  apiSecret: string;
  passphrase: string;
  name: string;
  nickname: string;
  exchangeType: exchangeType;
  addedDate: Date;
  logoUrl?: string;
}

export interface IExchangeAccountRequest {
  apiKey: string;
  apiSecret: string;
  passphrase: string;
  name: string;
  nickname?: string;
  exchangeType: exchangeType;
}

export type exchangeType =
  | "coinbasepro"
  | "binance"
  | "kucoin"
  | "binanceus"
  | "hitbtc"
  | "coinbase";

export interface IExchangeReference {
  id: string;
  name: string;
  logoUrl: string;
}
