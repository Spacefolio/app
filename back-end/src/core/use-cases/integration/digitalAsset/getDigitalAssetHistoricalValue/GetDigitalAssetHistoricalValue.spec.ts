import { GetDigitalAssetHistoricalValueRequest, GetDigitalAssetHistoricalValueUseCase } from ".";
import { makeFakeDigitalAssetHistory } from "../../../../../../__tests__/src/fixtures/DigitalAssetHistoryFixture";
import DigitalAssetHistoryInMemoryEntityGateway from "../../../../../data/Integrations/DigitalAsset/DigitalAssetHistoryInMemoryEntityGateway";
import IDigitalAssetHistoryEntityGateway from "../DigitalAssetHistoryEntityGateway";

describe('Get Digital Asset Historical Value Use Case', () => {
  const digitalAssetHistoryDatabase: IDigitalAssetHistoryEntityGateway = new DigitalAssetHistoryInMemoryEntityGateway();
  const getDigitalAssetHistoricalValueUseCase: GetDigitalAssetHistoricalValueUseCase = new GetDigitalAssetHistoricalValueUseCase(digitalAssetHistoryDatabase);
  const fakeDigitalAssetHistory = makeFakeDigitalAssetHistory();

  beforeAll (async () => {
    await digitalAssetHistoryDatabase.createDigitalAssetHistory(fakeDigitalAssetHistory);
  });

  it('Gets the historical value of a valid existing asset', async () => {
    const request: GetDigitalAssetHistoricalValueRequest = { assetId: fakeDigitalAssetHistory.assetId, timestamp: fakeDigitalAssetHistory.prices[0].timestamp };
    const response = await getDigitalAssetHistoricalValueUseCase.execute(request);
    
    expect(response.isError).toBe(false);
    const historicalPrice = response.getValue();

    expect(historicalPrice).toBe(fakeDigitalAssetHistory.prices[0]);
  });
});