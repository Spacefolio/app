import { UserNotFound } from "..";
import { Result } from "../../../../definitions";
import { ExchangeAccount } from "../../../../entities";
import { ExchangeAccountNotFound, RemoveExchangeAccountInvalidRequest, RemoveExchangeAccountActionFailed } from "./errors";

type RemoveExchangeAccountResponse = Result<ExchangeAccount, UserNotFound | ExchangeAccountNotFound | RemoveExchangeAccountActionFailed | RemoveExchangeAccountInvalidRequest>;

export default RemoveExchangeAccountResponse;
