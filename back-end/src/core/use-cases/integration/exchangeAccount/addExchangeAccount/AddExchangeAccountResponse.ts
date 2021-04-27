import { ExchangeAccount } from '../../../../entities';
import { Result } from '../../../../definitions';
import { AddExchangeAccountInvalidRequest, UserNotFound } from './errors';

type AddExchangeAccountResponse = Result<ExchangeAccount, UserNotFound | AddExchangeAccountInvalidRequest>;

export default AddExchangeAccountResponse;
