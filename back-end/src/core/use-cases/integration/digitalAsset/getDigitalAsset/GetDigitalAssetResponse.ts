import { DigitalAssetNotFound, GetDigitalAssetInvalidRequest } from '.';
import { Result } from '../../../../definitions';
import { IDigitalAsset } from '../../../../entities/Integrations/Asset';

type GetDigitalAssetResponse = Result<IDigitalAsset | GetDigitalAssetInvalidRequest | DigitalAssetNotFound>;

export default GetDigitalAssetResponse;
