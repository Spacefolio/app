import { User, IUser, ExchangeAccount } from '../../../core/entities';

export interface ICreateUserPayload {
  email: string;
  username?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  permissionLevel?: number;
}

interface IUserEntityGateway {
  exists(email: string): Promise<boolean>;
  usernameIsTaken(username: string): Promise<boolean>;
  getUser(email: string): Promise<User | undefined>;
  updateUser(user: IUser): Promise<User | undefined>;
  createUser(payload: ICreateUserPayload): Promise<User>;
  getUsers(): Promise<User[]>;
  clearUsers(): Promise<void>;
  addExchangeAccountForUser(email: string, exchangeAccount: ExchangeAccount): Promise<void>;
  removeExchangeAccountForUser(email: string, accountId: string): Promise<void>;
}

export default IUserEntityGateway;