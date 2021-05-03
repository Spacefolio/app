import { UseCaseError } from "../../../definitions";

export class DigitalAssetNotFound extends UseCaseError {

  constructor(assetId: string) {
    super(`The provided digital asset id '${assetId}' did not match any existing digital assets`);
  }
}

export default DigitalAssetNotFound;