import { UseCaseError } from "../../../../definitions";

export class InvalidCredentials extends UseCaseError {

  constructor() {
    super(`The provided credentials were not valid`);
  }
}

export default InvalidCredentials;