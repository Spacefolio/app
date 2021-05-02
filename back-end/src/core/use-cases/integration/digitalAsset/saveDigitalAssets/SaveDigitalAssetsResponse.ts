import { Result } from '../../../../definitions';
import { SaveDigitalAssetsInvalidRequest } from './errors';
import { IDigitalAsset } from '../../../../entities/Integrations/Asset';

type SaveDigitalAssetsResponse = Result<IDigitalAsset[], SaveDigitalAssetsInvalidRequest>;

export default SaveDigitalAssetsResponse;
