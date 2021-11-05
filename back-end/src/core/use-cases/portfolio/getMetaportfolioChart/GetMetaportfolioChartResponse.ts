import { Result } from "../../../definitions";
import { Chart } from "../../../entities";
import { ExchangeAccountNotFound, UserNotFound } from "../../common/errors";
import { GetMetaportfolioChartInvalidRequest } from "./errors";

type GetMetaportfolioChartResponse = Result<Chart, UserNotFound | ExchangeAccountNotFound | GetMetaportfolioChartInvalidRequest>;

export default GetMetaportfolioChartResponse;