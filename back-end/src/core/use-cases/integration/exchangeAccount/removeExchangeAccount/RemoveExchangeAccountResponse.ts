import { UserNotFound } from "..";
import { Result } from "../../../../definitions";
import { ExchangeAccount } from "../../../../entities";
import { ExchangeAccountNotFound, RemoveExchangeAccountInvalidRequest } from "./errors";

type RemoveExchangeAccountResponse = Result<ExchangeAccount, UserNotFound | ExchangeAccountNotFound | RemoveExchangeAccountInvalidRequest>;

export default RemoveExchangeAccountResponse;
