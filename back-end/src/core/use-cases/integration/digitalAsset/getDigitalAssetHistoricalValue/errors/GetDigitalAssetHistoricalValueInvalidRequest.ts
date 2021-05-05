import { UseCaseError } from "../../../../../definitions";

export class GetDigitalAssetHistoricalValueInvalidRequest extends UseCaseError {

  constructor(requestPayload: unknown) {
    super(`request '${JSON.stringify(requestPayload)}' is not valid`);
  }
}

export default GetDigitalAssetHistoricalValueInvalidRequest;