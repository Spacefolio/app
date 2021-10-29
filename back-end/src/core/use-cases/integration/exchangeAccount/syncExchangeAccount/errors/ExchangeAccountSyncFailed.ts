import { UseCaseError } from "../../../../../definitions";

export class ExchangeAccountSyncFailed extends UseCaseError {

  constructor(exchange: string) {
    super(`Unable to sync ${exchange} account`);
  }
}

export default ExchangeAccountSyncFailed;