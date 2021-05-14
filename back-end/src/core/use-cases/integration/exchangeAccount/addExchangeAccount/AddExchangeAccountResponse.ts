import { ExchangeAccount } from '../../../../entities';
import { Result } from '../../../../definitions';
import { AddExchangeAccountInvalidRequest, InvalidExchangeCredentials, UserNotFound } from './errors';

type AddExchangeAccountResponse = Result<ExchangeAccount, UserNotFound | InvalidExchangeCredentials | AddExchangeAccountInvalidRequest>;

export default AddExchangeAccountResponse;
