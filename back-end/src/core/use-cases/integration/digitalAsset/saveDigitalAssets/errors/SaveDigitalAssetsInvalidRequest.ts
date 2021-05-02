import { UseCaseError } from "../../../../../definitions";

export class SaveDigitalAssetsInvalidRequest extends UseCaseError {

  constructor(requestPayload: unknown) {
    super(`request '${JSON.stringify(requestPayload)}' is not valid`);
  }
}

export default SaveDigitalAssetsInvalidRequest;