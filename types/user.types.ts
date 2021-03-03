import { IExchangeAccountView } from './exchange.types';

export interface IUser {
    id: string;
    username: string;
    hash: string;
    firstName: string;
    lastName: string;
    linkedExchanges: IExchangeAccountView[];
}

export interface INewUser {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ILoginRequest {
    username: string;
    password: string;
}

export interface IRegisterRequest {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}