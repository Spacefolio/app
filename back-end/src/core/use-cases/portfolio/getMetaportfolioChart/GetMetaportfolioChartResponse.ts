import { Result } from "../../../definitions";
import { Chart } from "../../../entities";
import { UserNotFound } from "../../common/errors";
import { GetMetaportfolioChartInvalidRequest } from "./errors";

type GetMetaportfolioChartResponse = Result<Chart, UserNotFound | GetMetaportfolioChartInvalidRequest>;

export default GetMetaportfolioChartResponse;