import { SaveDigitalAssetsUseCase } from ".";
import { IDigitalAssetEntityGateway } from "..";
import { fakeFetchDigitalAssets } from "../../../../../../__tests__/src/fixtures/DigitalAssetFixture";
import { DigitalAssetInMemoryEntityGateway } from "../../../../../data";

describe('Save All Digital Assets Use Case', () => {
  const digitalAssetDatabase: IDigitalAssetEntityGateway = new DigitalAssetInMemoryEntityGateway();
  const saveDigitalAssetsUseCase: SaveDigitalAssetsUseCase = new SaveDigitalAssetsUseCase(digitalAssetDatabase, fakeFetchDigitalAssets);

  beforeEach(async () => {
    await digitalAssetDatabase.clearDigitalAssets();
  });

  it('Saves all assets successfully', async () => {
    const response = await saveDigitalAssetsUseCase.execute();
    
    expect(response.isError).toBe(false);
    const assets = response.getValue();

    expect(assets.length).toBe(4);
  });
});