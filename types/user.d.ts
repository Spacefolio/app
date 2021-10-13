import { IExchangeAccountView } from './exchange';

export interface IUser {
	id: string;
	email: string;
	hash: string;
	firstName?: string;
	lastName?: string;
	linkedExchanges: IExchangeAccountView[];
}

export interface IUserView {
	id: string;
	username?: string;
	email: string;
	firstName?: string;
	lastName?: string;
	token?: string;
}

export interface IUserUpdateRequest {
	id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
}

export interface INewUser {
	email: string;
	username: string;
	password: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IRegisterRequest {
	email: string;
	password: string;
}
