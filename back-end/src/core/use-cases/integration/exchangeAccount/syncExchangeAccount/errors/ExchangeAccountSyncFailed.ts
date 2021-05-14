import { UseCaseError } from "../../../../../definitions";

export class ExchangeAccountSyncFailed extends UseCaseError {

  constructor(accountId: string) {
    super(`An error occurred while syncing the exchange account with id: '${accountId}'.`);
  }
}

export default ExchangeAccountSyncFailed;