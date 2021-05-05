import { UseCaseError } from "../../../definitions";

export class DigitalAssetNotFound extends UseCaseError {

  constructor(assetId: string) {
    super(`No historical data could be found for the provided digital asset id '${assetId}'`);
  }
}

export default DigitalAssetNotFound;