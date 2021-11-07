import { UseCaseError } from "../../../../definitions";

export class ExchangeAccountsNotSynced extends UseCaseError {

  constructor() {
    super(`Exchange Accounts must be synced`);
  }
}

export default ExchangeAccountsNotSynced;