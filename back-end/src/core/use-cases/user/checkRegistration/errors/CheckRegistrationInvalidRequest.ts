import { UseCaseError } from "../../../../definitions";

export class CheckRegistrationInvalidRequest extends UseCaseError {

  constructor(requestPayload: unknown) {
    super(`request '${JSON.stringify(requestPayload)}' is not valid`);
  }
}

export default CheckRegistrationInvalidRequest;