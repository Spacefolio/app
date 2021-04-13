import { User, IUser } from '../../../core/entities';

export interface ICreateUserPayload {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  permissionLevel?: number;
}

interface IUserEntityGateway {
  exists(email: string): Promise<boolean>;
  getUser(email: string): Promise<Readonly<User> | undefined>;
  updateUser(user: IUser): Promise<Readonly<User> | undefined>;
  createUser(payload: ICreateUserPayload): Promise<Readonly<User>>;
  getUsers(): Promise<Readonly<User>[] | undefined>;
}

export default IUserEntityGateway;