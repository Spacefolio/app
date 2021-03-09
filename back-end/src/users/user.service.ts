const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import { ILoginRequest, IRegisterRequest, IUserView } from "../../../types";
import { User } from "../_helpers/db";

export const userService = {
  authenticate,
  getAll,
  getById,
  create,
  checkIfRegistered,
  // update,
  // delete: _delete
};

async function authenticate(userRequest: ILoginRequest): Promise<IUserView> {
  const user = await User.findOne({ email: userRequest.email }).lean();
  if (user && bcrypt.compareSync(userRequest.password, user.hash)) {
    const token = jwt.sign({ sub: user._id }, config.secret, {
      expiresIn: "7d",
    });
    console.log(user);
    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
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

async function checkIfRegistered(email: string): Promise<boolean>
{
  return (await User.exists({ email }));
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
      console.log(err);
      throw err;
    }
  });
}

async function update(id: string, userParam: IRegisterRequest) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'Username "' + userParam.email + '" is already taken';
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
