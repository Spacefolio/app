import { IUserUpdateRequest } from './../../../types/user.types';
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import { ILoginRequest, IRegisterRequest, IUserView } from '../../../types';
import { User } from '../_helpers/db';
import { debug } from '../_helpers/logs';

export const userService = {
	authenticate,
	getAll,
	getById,
	create,
	checkIfRegistered,
	update,
	delete: _delete,
};

async function authenticate(userRequest: ILoginRequest): Promise<IUserView> {
	const user = await User.findOne({ email: userRequest.email }).lean();
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

async function getAll() {
	return await User.find();
}

async function getById(id: string) {
	return await User.findById(id);
}

async function checkIfRegistered(email: string): Promise<boolean> {
	return await User.exists({ email });
}

async function create(userParam: IRegisterRequest) {
	// validate

	if (await User.findOne({ email: userParam.email })) {
		throw 'Email "' + userParam.email + '" is already taken';
	}

	const user = new User(userParam);

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

async function update(userId: string, userParam: IUserUpdateRequest) {
	const user = await User.findById(userId);

	// validate
	if (!user) throw 'User not found';

	const providedEmail = await User.findOne({ email: userParam.email });
	const providedUsername = await User.findOne({ username: userParam.username });

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

async function _delete(id: string) {
	await User.findByIdAndRemove(id);
}
