import { UserNotFound } from "..";
import { Result } from "../../../../definitions";
import { IHolding } from "../../../../entities";
import { ExchangeAccountNotFound, GetCurrentHoldingsInvalidRequest } from "./errors";

type GetCurrentHoldingsResponse = Result<IHolding[], UserNotFound | ExchangeAccountNotFound | GetCurrentHoldingsInvalidRequest>;

export default GetCurrentHoldingsResponse;
