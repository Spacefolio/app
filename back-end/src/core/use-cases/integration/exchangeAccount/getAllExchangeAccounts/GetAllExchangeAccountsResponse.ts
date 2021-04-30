import { UserNotFound } from "..";
import { Result } from "../../../../definitions";
import { ExchangeAccount } from "../../../../entities";
import { GetAllExchangeAccountsInvalidRequest } from "./errors";

type GetAllExchangeAccountsResponse = Result<ExchangeAccount[], UserNotFound | GetAllExchangeAccountsInvalidRequest>;

export default GetAllExchangeAccountsResponse;
