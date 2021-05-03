import { DigitalAssetNotFound, GetDigitalAssetCurrentValueInvalidRequest } from '.';
import { Result } from '../../../../definitions';

type GetDigitalAssetResponse = Result<number | GetDigitalAssetCurrentValueInvalidRequest | DigitalAssetNotFound>;

export default GetDigitalAssetResponse;
