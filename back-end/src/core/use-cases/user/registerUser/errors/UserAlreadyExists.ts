import { UseCaseError } from "../../../../definitions";

export class UserAlreadyExists extends UseCaseError {

  constructor(email: string) {
    super(`A user with the email '${email}' already exists`);
  }
}

export default UserAlreadyExists;