import { UserNotFound, ExchangeAccountNotFound } from "..";
import { Result } from "../../../../definitions";
import { ExchangeAccount } from "../../../../entities";
import { SyncExchangeAccountInvalidRequest, ExchangeAccountSyncFailed } from "./errors";

type SyncExchangeAccountResponse = Result<ExchangeAccount, UserNotFound | ExchangeAccountNotFound | ExchangeAccountSyncFailed | SyncExchangeAccountInvalidRequest>;

export default SyncExchangeAccountResponse;
