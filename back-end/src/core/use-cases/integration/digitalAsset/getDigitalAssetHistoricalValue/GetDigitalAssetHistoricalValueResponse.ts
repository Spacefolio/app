import { DigitalAssetHistoryNotFound, GetDigitalAssetHistoricalValueInvalidRequest } from '.';
import { Result } from '../../../../definitions';
import { IHistoricalPrice } from '../../../../entities/Integrations/Asset';

type GetDigitalAssetHistoricalValueResponse = Result<IHistoricalPrice | GetDigitalAssetHistoricalValueInvalidRequest | DigitalAssetHistoryNotFound>;

export default GetDigitalAssetHistoricalValueResponse;
