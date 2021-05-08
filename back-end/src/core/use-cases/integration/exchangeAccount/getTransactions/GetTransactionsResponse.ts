import { UserNotFound } from "..";
import { Result } from "../../../../definitions";
import { IDigitalAssetTransaction } from "../../../../entities/Integrations/Transaction";
import { ExchangeAccountNotFound, GetCurrentHoldingsInvalidRequest as GetTransactionsInvalidRequest } from "./errors";

type GetTransactionsResponse = Result<IDigitalAssetTransaction[], UserNotFound | ExchangeAccountNotFound | GetTransactionsInvalidRequest>;

export default GetTransactionsResponse;
