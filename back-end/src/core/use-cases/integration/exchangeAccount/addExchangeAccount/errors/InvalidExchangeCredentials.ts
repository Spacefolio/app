import { UseCaseError } from "../../../../../definitions";
import { IExchangeCredentials } from "../../../../../entities";

export class InvalidExchangeCredentials extends UseCaseError {

  constructor(credentials: IExchangeCredentials) {
    super(`The provided exchange account credentials were not valid: ${credentials}`);
  }
}

export default InvalidExchangeCredentials;