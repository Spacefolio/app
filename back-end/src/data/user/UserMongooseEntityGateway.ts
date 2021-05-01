import { IUserEntityGateway, CreateUserPayload } from '../../core/use-cases/user';
import { User, IUser, makeUser, ExchangeAccount } from '../../core/entities';
import { IUserDocument } from './UserModel';
import UserMapper from './UserMapper';
import { IExchangeAccountDocument } from '..';
import { Model } from 'mongoose';

class UserMongooseEntityGateway implements IUserEntityGateway {

  constructor(public Users: Model<IUserDocument>, public ExchangeAccounts: Model<IExchangeAccountDocument>) {}
  
  async exists (email: string): Promise<boolean> {
    const exists = await this.Users.exists({ email });
    return exists;
  }

  async getUser(email: string): Promise<User | undefined> {
    const user = await this.Users.findOne({ email }).populate('exchangeAccounts');
    if (user) {
      return UserMapper.toDomain(user);
    }
    return undefined;
  }

  async updateUser(user: IUser): Promise<User | undefined> {
    const userToUpdate = await this.Users.findOne({ email: user.email });

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
    const newUser = await this.Users.create(payload);
    const userEntity = UserMapper.toDomain(newUser);
    return userEntity;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.Users.find().lean();
    return users.map((user) => UserMapper.toDomain(user));
  }

  async clearUsers() : Promise<void> {
    await this.Users.remove({});
  }

  async addExchangeAccountForUser(email: string, exchangeAccount: ExchangeAccount): Promise<void> {
    const user = await this.Users.findOne({ email });
    if (!user) return;

    const account = await this.ExchangeAccounts.findOne({ accountId: exchangeAccount.accountId }).lean();
    if (!account) return;
    
    const accounts = user.exchangeAccounts as string[];
    user.exchangeAccounts = [...accounts, account._id];
    await user.save();
  }

  async removeExchangeAccountForUser(email: string, accountId: string): Promise<void> {
    const user: IUserDocument | null = await this.Users.findOne({ email });
    if (!user) return;

    const exchangeAccount = await this.ExchangeAccounts.findOne({ accountId }).lean();
    if (!exchangeAccount) return;

    const updatedAccounts = user.exchangeAccounts as string[];
    user.exchangeAccounts = updatedAccounts.filter((id: string) => id != exchangeAccount.id);
    await user.save();
  }
}

export default UserMongooseEntityGateway;