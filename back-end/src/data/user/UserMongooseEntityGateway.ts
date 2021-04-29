import { IUserEntityGateway, CreateUserPayload } from '../../core/use-cases/user';
import { User, IUser, makeUser, ExchangeAccount } from '../../core/entities';
import UserModel, { IUserDocument } from './UserModel';
import UserMapper from './UserMapper';
import { ExchangeAccountModel } from '..';

const Users = UserModel;
const ExchangeAccounts = ExchangeAccountModel;

class UserMongooseEntityGateway implements IUserEntityGateway {
  
  async exists (email: string): Promise<boolean> {
    const exists = await Users.exists({ email });
    return exists;
  }

  async getUser(email: string): Promise<User | undefined> {
    const user = await Users.findOne({ email }).populate('exchangeAccounts');
    if (user) {
      return UserMapper.toDomain(user);
    }
    return undefined;
  }

  async updateUser(user: IUser): Promise<User | undefined> {
    const userToUpdate = await Users.findOne({ email: user.email });

    if (!userToUpdate) {
      return undefined;
    }

    const userEntity = makeUser(user);
    const userDao = UserMapper.fromDomain(userEntity);
    Object.assign(userToUpdate, userDao);

    userToUpdate.save((err) => {
      if (err) {
        return undefined;
      }
    });

    return userEntity;
  }

  async createUser(payload: CreateUserPayload): Promise<User> {
    const newUser = await Users.create(payload);
    const userEntity = UserMapper.toDomain(newUser);
    return userEntity;
  }

  async getUsers(): Promise<User[]> {
    const users = await Users.find().lean();
    return users.map((user) => UserMapper.toDomain(user));
  }

  async clearUsers() : Promise<void> {
    await Users.remove({});
  }

  async addExchangeAccountForUser(email: string, exchangeAccount: ExchangeAccount): Promise<void> {
    const user = await Users.findOne({ email });
    if (!user) return;

    const account = await ExchangeAccounts.findOne({ accountId: exchangeAccount.accountId }).lean();
    if (!account) return;
    const accounts = user.exchangeAccounts as string[];
    user.exchangeAccounts = [...accounts, account.id];
    await user.save();
  }

  async removeExchangeAccountForUser(email: string, accountId: string): Promise<void> {
    const user: IUserDocument | null = await Users.findOne({ email });
    if (!user) return;

    const exchangeAccount = await ExchangeAccounts.findOne({ accountId }).lean();
    if (!exchangeAccount) return;

    const updatedAccounts = user.exchangeAccounts as string[];
    user.exchangeAccounts = updatedAccounts.filter((id: string) => id != exchangeAccount.id);
    await user.save();
  }
}

export default UserMongooseEntityGateway;