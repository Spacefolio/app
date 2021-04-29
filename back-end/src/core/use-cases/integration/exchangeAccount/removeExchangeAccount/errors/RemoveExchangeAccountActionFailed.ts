import { UseCaseError } from "../../../../../definitions";

export class RemoveExchangeAccountActionFailed extends UseCaseError {

  constructor() {
    super(`The exchange account could not be deleted due to an internal server error`);
  }
}

export default RemoveExchangeAccountActionFailed;