import { UseCaseError } from "../../../definitions";

export class UserNotFound extends UseCaseError {

  constructor(email: string) {
    super(`The provided email '${email}' did not match any existing users`);
  }
}

export default UserNotFound;