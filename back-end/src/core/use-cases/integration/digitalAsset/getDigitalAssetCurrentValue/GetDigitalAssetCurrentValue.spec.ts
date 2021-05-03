import { GetDigitalAssetCurrentValueRequest, GetDigitalAssetCurrentValueUseCase } from ".";
import { IDigitalAssetEntityGateway } from "..";
import { makeFakeDigitalAssetMarketData } from "../../../../../../__tests__/src/fixtures/DigitalAssetFixture";
import { DigitalAssetInMemoryEntityGateway } from "../../../../../data";

describe('Get Digital Asset Current Value Use Case', () => {
  const digitalAssetDatabase: IDigitalAssetEntityGateway = new DigitalAssetInMemoryEntityGateway();
  const getDigitalAssetCurrentValueUseCase: GetDigitalAssetCurrentValueUseCase = new GetDigitalAssetCurrentValueUseCase(digitalAssetDatabase);
  const fakeDigitalAsset = makeFakeDigitalAssetMarketData();

  beforeAll (async () => {
    await digitalAssetDatabase.createDigitalAsset(fakeDigitalAsset);
  });

  it('Gets the current value of a valid existing asset', async () => {
    const request: GetDigitalAssetCurrentValueRequest = { assetId: fakeDigitalAsset.id };
    const response = await getDigitalAssetCurrentValueUseCase.execute(request);
    
    expect(response.isError).toBe(false);
    const currentPrice = response.getValue();

    expect(currentPrice).toBe(fakeDigitalAsset.current_price);
  });
});