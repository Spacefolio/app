import { UserNotFound } from "..";
import { Result } from "../../../../definitions";
import { ExchangeAccount } from "../../../../entities";
import { ExchangeAccountNotFound, GetExchangeAccountInvalidRequest } from "./errors";

type GetExchangeAccountResponse = Result<ExchangeAccount, UserNotFound | ExchangeAccountNotFound | GetExchangeAccountInvalidRequest>;

export default GetExchangeAccountResponse;
