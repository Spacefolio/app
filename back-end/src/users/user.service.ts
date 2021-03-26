import { IUserUpdateRequest } from './../../../types/user.types';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import { ILoginRequest, IRegisterRequest, IUserView } from '../../../types';
import { debug } from '../_helpers/logs';
import { UserModel } from './user.model';
import config from '../../config.json';

export class User {
	protected id: string = '';
	protected email: string = '';
	protected firstName: string = '';
	protected lastName: string = '';
	protected username: string = '';
	protected token: string = '';

	constructor() {}

	static async login(userRequest: ILoginRequest): Promise<IUserView> {
		const user = await UserModel.findOne({ email: userRequest.email }).lean();
		if (user && bcrypt.compareSync(userRequest.password, user.hash)) {
			const token = jwt.sign({ sub: user._id }, config.secret, {
				expiresIn: '7d',
			});
			debug(`Authenticated user: ${user}`);
			return {
				id: user._id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				username: user.username,
				token,
			};
		}
	}

	static async getAll() {
		return await UserModel.find();
	}

	static async getById(id: string) {
		return await UserModel.findById(id);
	}

	static async checkIfRegistered(email: string): Promise<boolean> {
		return await UserModel.exists({ email });
	}

	static async create(userParam: IRegisterRequest) {
		// validate

		if (await UserModel.findOne({ email: userParam.email })) {
			throw 'Email "' + userParam.email + '" is already taken';
		}

		const user = new UserModel(userParam);

		// hash password
		if (userParam.password) {
			user.hash = bcrypt.hashSync(userParam.password, 10);
		}

		// save user
		user.save(function (err, user) {
			if (err) {
				console.error(err);
				throw err;
			}
		});
	}

	static async update(userId: string, userParam: IUserUpdateRequest) {
		const user = await UserModel.findById(userId);

		// validate
		if (!user) throw 'User not found';

		const providedEmail = await UserModel.findOne({ email: userParam.email });
		const providedUsername = await UserModel.findOne({
			username: userParam.username,
		});

		if (user.email !== userParam.email && providedEmail) {
			throw 'Email "' + userParam.email + '" is already taken';
		}

		if (user.username !== userParam.username && providedUsername) {
			throw `Username ${userParam.username} is alreadt in use`;
		}

		Object.assign(user, userParam);

		const { id, username, email, firstName, lastName } = await user.save();

		return { id, username, email, firstName, lastName };
	}

	static async _delete(id: string) {
		await UserModel.findByIdAndRemove(id);
	}

	// ################################################################
	// ###################### PRIVATE FUNCTIONS #######################

	protected getUserInfo(): IUserView {
		return {
			id: this.id,
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
			username: this.username,
			token: this.token,
		};
	}
}
