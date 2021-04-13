import { Result } from '../../../definitions';
import { User } from '../../../entities';
import { AuthenticateUserInvalidRequest, InvalidCredentials, UserNotFound } from './errors';

type AuthenticateUserResponseDto = Result<Readonly<User>, UserNotFound | InvalidCredentials | AuthenticateUserInvalidRequest>;

export default AuthenticateUserResponseDto;
