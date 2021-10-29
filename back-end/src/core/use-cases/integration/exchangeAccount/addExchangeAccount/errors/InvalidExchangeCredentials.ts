import { UseCaseError } from "../../../../../definitions";

export class InvalidExchangeCredentials extends UseCaseError {

  constructor() {
    super(`The provided exchange account credentials were invalid`);
  }
}

export default InvalidExchangeCredentials;