import { Result } from '../../../definitions';
import { CheckRegistrationInvalidRequest } from './errors';

type CheckRegistrationResponse = Result<boolean, CheckRegistrationInvalidRequest>;

export default CheckRegistrationResponse;
