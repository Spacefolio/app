import { UseCaseError } from "../../../../../definitions";

export class GetTransactionsInvalidRequest extends UseCaseError {

  constructor(requestPayload: unknown) {
    super(`request '${JSON.stringify(requestPayload)}' is not valid`);
  }
}

export default GetTransactionsInvalidRequest;