export interface IExchangeAccount {
  id: string;
  exchangeType: number;
  nickname: string;
  name: string;
  logoUrl: string;
  apiKey: string;
  apiSecret: string;
  passphrase: string;
}
export interface IExchangeAccountRequest {
  exchangeType: number;
  nickname: string;
  name: string;
  logoUrl: string;
  apiKey: string;
  apiSecret: string;
  passphrase: string;
}
export interface IExchangeReference {
  id: number;
  name: string;
  logoUrl: string;
}
