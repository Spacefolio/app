import { UseCaseError } from "../../../../../definitions";

export class GetDigitalAssetInvalidRequest extends UseCaseError {

  constructor(requestPayload: unknown) {
    super(`request '${JSON.stringify(requestPayload)}' is not valid`);
  }
}

export default GetDigitalAssetInvalidRequest;