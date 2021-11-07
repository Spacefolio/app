import { Result } from "../../../definitions";
import { Chart } from "../../../entities";
import { ExchangeAccountNotFound, UserNotFound } from "../../common/errors";
import { ExchangeAccountsNotSynced, GetMetaportfolioChartInvalidRequest } from "./errors";

type GetMetaportfolioChartResponse = Result<Chart, UserNotFound | ExchangeAccountNotFound | ExchangeAccountsNotSynced | GetMetaportfolioChartInvalidRequest>;

export default GetMetaportfolioChartResponse;