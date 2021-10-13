import { ExchangeAccountSyncFailed, UserNotFound } from "..";
import { Result } from "../../../../definitions";
import { ExchangeAccount } from "../../../../entities";
import { SyncExchangeAccountsInvalidRequest } from "./errors";

type SyncExchangeAccountsResponse = Result<ExchangeAccount[], UserNotFound | ExchangeAccountSyncFailed | SyncExchangeAccountsInvalidRequest>;

export default SyncExchangeAccountsResponse;
