import { Result } from '../../../definitions';
import { User } from '../../../entities';
import { AuthenticateUserInvalidRequest, InvalidCredentials, UserNotFound } from './errors';

type AuthenticateUserResponse = Result<User, UserNotFound | InvalidCredentials | AuthenticateUserInvalidRequest>;

export default AuthenticateUserResponse;
