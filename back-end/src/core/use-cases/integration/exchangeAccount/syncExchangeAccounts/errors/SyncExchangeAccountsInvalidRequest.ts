import { UseCaseError } from "../../../../../definitions";

export class SyncExchangeAccountsInvalidRequest extends UseCaseError {

  constructor(requestPayload: unknown) {
    super(`request '${JSON.stringify(requestPayload)}' is not valid`);
  }
}

export default SyncExchangeAccountsInvalidRequest;