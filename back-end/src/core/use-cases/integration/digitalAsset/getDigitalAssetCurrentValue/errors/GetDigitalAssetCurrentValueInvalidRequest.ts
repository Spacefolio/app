import { UseCaseError } from "../../../../../definitions";

export class GetDigitalAssetCurrentValueInvalidRequest extends UseCaseError {

  constructor(requestPayload: unknown) {
    super(`request '${JSON.stringify(requestPayload)}' is not valid`);
  }
}

export default GetDigitalAssetCurrentValueInvalidRequest;