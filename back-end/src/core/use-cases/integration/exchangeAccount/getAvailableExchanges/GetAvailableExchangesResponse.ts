import { Result } from "../../../../definitions";
import { IExchange } from "../../../../entities";

type GetAvailableExchangesResponse = Result<IExchange[]>;

export default GetAvailableExchangesResponse;
