export interface IExchangeAccountView {
  name: string;
  id: string;
  nickname: string;
  exchangeType: exchangeType;
  addedDate: Date;
  logoUrl?: string;
  apiInfo: {
    apiKey: string;
    secret: string;
    password: string;
  };
}

export interface IExchangeAccountRequest {
  apiInfo: IExchangeAccountCredentials
  name: string;
  nickname?: string;
  exchangeType: exchangeType;
  logoUrl?: string;
}

export interface IAddExchangeAccountRequest {
  credentials: IExchangeAccountCredentials,
  exchange: exchangeType,
  nickname: string
}

export interface IExchangeAccountCredentials {
  apiKey?: string;
  secret?: string;
  password?: string;
  uid?: string;
  login?: string;
  twofa?: string;
  privateKey?: string;
  walletAddress?: string;
  token?: string;
}

export interface IIntegrationInfo {
  id: exchangeType;
  name: string;
  logoUrl: string;
  requiredCredentials: RequiredCredentials
}

export interface RequiredCredentials {
  apiKey: boolean;
  secret: boolean;
  uid: boolean;
  login: boolean;
  password: boolean;
  twofa: boolean;
  privateKey: boolean;
  walletAddress: boolean;
  token: boolean;
}

export type exchangeType =
  | "coinbasepro"
  | "binance"
  | "kucoin"
  | "binanceus"
  | "hitbtc"
  | "coinbase";