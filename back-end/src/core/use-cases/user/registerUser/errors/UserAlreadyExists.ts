import { UseCaseError } from "../../../../definitions";

export class UserAlreadyExists extends UseCaseError {

  constructor(field: string, value: string) {
    super(`A user with the ${field} '${value}' already exists`);
  }
}

export default UserAlreadyExists;