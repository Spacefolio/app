import { UseCaseError } from "../../../../../definitions";

export class DigitalAssetHistoricalPriceNotFound extends UseCaseError {

  constructor(assetId: string, timestamp: number) {
    super(`The historical price data for the asset '${assetId}' did not have the price history for the requested timestamp '${timestamp}'.`);
  }
}

export default DigitalAssetHistoricalPriceNotFound;