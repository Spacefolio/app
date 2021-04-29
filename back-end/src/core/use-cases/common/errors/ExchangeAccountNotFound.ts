import { UseCaseError } from "../../../definitions";

export class ExchangeAccountNotFound extends UseCaseError {

  constructor(accountId: string) {
    super(`The provided exchange account id '${accountId}' did not match any existing exchange accounts for this user`);
  }
}

export default ExchangeAccountNotFound;