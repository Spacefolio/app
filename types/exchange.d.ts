export interface IExchangeAccountView {
  name: string;
  id: string;
  nickname: string;
  exchangeType: exchangeType;
  addedDate: Date;
  logoUrl?: string;
  apiInfo: {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
  };
}

export interface IExchangeAccountRequest {
  apiInfo: {
    apiKey?: string;
    apiSecret?: string;
    passphrase?: string;
    uid?: string;
    login?: string;
    twofa?: string;
    privateKey?: string;
    walletAddress?: string;
    token?: string;
  };
  name: string;
  nickname?: string;
  exchangeType: exchangeType;
  logoUrl?: string;
}

export interface IIntegrationInfo {
  id: exchangeType;
  name: string;
  logoUrl: string;
  requiredCredentials: {
    apiKey: boolean;
    secret: boolean;
    uid: boolean;
    login: boolean;
    password: boolean;
    twofa: boolean;
    privateKey: boolean;
    walletAddress: boolean;
    token: boolean;
  };
}

export type exchangeType =
  | "coinbasepro"
  | "binance"
  | "kucoin"
  | "binanceus"
  | "hitbtc"
  | "coinbase";