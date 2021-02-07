const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import { User, IUser, ILoginRequest, IRegisterRequest, IUserDocument, IUserModel } from './user.model';

export const userService = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate(userRequest: ILoginRequest) {
    const user = await User.findById(userRequest.username);
    if (user && bcrypt.compareSync(userRequest.password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id: string) {
    return await User.findById(id);
}

async function create(userParam: IRegisterRequest) {
    // validate
    
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    user.save(function(err, user) {
        if (err) {
            console.log(err);
            throw "Bad Request"
        }
    });
}

async function update(id: string, userParam: IRegisterRequest) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
 
    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id: string) {
    await User.findByIdAndRemove(id);
}