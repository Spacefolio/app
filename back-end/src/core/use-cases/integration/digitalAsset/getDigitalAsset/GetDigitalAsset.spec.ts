import { GetDigitalAssetRequest, GetDigitalAssetUseCase } from ".";
import { IDigitalAssetEntityGateway } from "..";
import { makeFakeDigitalAssetMarketData } from "../../../../../../__tests__/src/fixtures/DigitalAssetFixture";
import { DigitalAssetInMemoryEntityGateway } from "../../../../../data";
import { IDigitalAsset } from "../../../../entities";

describe('Get Digital Asset Use Case', () => {
  const digitalAssetDatabase: IDigitalAssetEntityGateway = new DigitalAssetInMemoryEntityGateway();
  const getDigitalAssetUseCase: GetDigitalAssetUseCase = new GetDigitalAssetUseCase(digitalAssetDatabase);
  const fakeDigitalAsset = makeFakeDigitalAssetMarketData();

  beforeAll (async () => {
    await digitalAssetDatabase.createDigitalAsset(fakeDigitalAsset);
  });

  it('Gets a valid existing asset', async () => {
    const request: GetDigitalAssetRequest = { assetId: fakeDigitalAsset.id };
    const response = await getDigitalAssetUseCase.execute(request);
    
    expect(response.isError).toBe(false);
    const asset = response.getValue() as IDigitalAsset;

    expect(asset.name).toBe(fakeDigitalAsset.name);
    expect(asset.symbol).toBe(fakeDigitalAsset.symbol);
  });
});