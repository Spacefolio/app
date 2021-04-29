import { Exchange, IExchangeCredentials } from "../../../../entities";

interface AddExchangeAccountRequest {
  email: string,
  exchange: Exchange;
  nickname: string;
  credentials: IExchangeCredentials;
}

export default AddExchangeAccountRequest;