import { IUserEntityGateway, CreateUserPayload } from '../../core/use-cases/user';
import { User, IUser, makeUser, ExchangeAccount, BaseExchange, Exchange } from '../../core/entities';
import { IUserDocument } from './UserModel';
import UserMapper from './UserMapper';
import { IExchangeAccountDocument } from '..';
import { Model } from 'mongoose';
import mongoose from '../mongoose';

class UserMongooseEntityGateway implements IUserEntityGateway {
	private userMapper;
	constructor(public Users: Model<IUserDocument>, public ExchangeAccounts: Model<IExchangeAccountDocument>, exchanges: (exchange: Exchange) => BaseExchange) {
		this.userMapper = new UserMapper(exchanges);
	}

	async exists(email: string): Promise<boolean> {
		return await this.Users.exists({ email });
	}

	async usernameIsTaken(username: string): Promise<boolean> {
		return await this.Users.exists({ username });
	}

	async getUser(email: string): Promise<User | undefined> {
		const user = await this.Users.findOne({ email }).populate('exchangeAccounts');
		if (user) {
			return this.userMapper.toDomain(user);
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
		const userEntity = this.userMapper.toDomain(newUser);
		return userEntity;
	}

	async getUsers(): Promise<User[]> {
		const users = await this.Users.find().lean();
		return users.map((user) => this.userMapper.toDomain(user));
	}

	async clearUsers(): Promise<void> {
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

		const exchangeAccount = await this.ExchangeAccounts.findOne({ accountId });
		if (!exchangeAccount) return;

		const updatedAccounts = user.exchangeAccounts as string[];
		user.exchangeAccounts = updatedAccounts.filter((id: string) => id != exchangeAccount.id);
		await user.save();
	}

	async userHasExchangeAccount(email: string, accountId: string): Promise<boolean> {
    const user = await this.getUser(email);
    if (!user) return false;
    return user.exchangeAccounts.some((account) => account.accountId === accountId);
  }
}

export default UserMongooseEntityGateway;
