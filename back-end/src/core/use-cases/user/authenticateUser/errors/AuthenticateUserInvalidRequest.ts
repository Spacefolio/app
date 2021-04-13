import { UseCaseError } from "../../../../definitions";

export class AuthenticateUserInvalidRequest extends UseCaseError {

  constructor(requestPayload: unknown) {
    super(`request '${JSON.stringify(requestPayload)}' is not valid`);
  }
}

export default AuthenticateUserInvalidRequest;