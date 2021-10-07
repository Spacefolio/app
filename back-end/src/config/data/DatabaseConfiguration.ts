import { ExchangeAccountInMemoryEntityGateway, ExchangeAccountMongooseEntityGateway, UserInMemoryEntityGateway, UserMongooseEntityGateway, UserModel, ExchangeAccountModel, DigitalAssetMongooseEntityGateway, IDigitalAssetAdapter, DigitalAssetModel, DigitalAssetHistoryMongooseEntityGateway, DigitalAssetHistoryModel, DigitalAssetInMemoryEntityGateway, DigitalAssetHistoryInMemoryEntityGateway } from "../../data";

class DatabaseConfiguration {

  static getUserInMemoryDatabase(): UserInMemoryEntityGateway {
    return new UserInMemoryEntityGateway();
  }

  static getUserMongoDatabase(): UserMongooseEntityGateway {
    return new UserMongooseEntityGateway(UserModel, ExchangeAccountModel);
  }

  static getExchangeAccountInMemoryDatabase(): ExchangeAccountInMemoryEntityGateway {
    return new ExchangeAccountInMemoryEntityGateway();
  }

  static getExchangeAccountMongoDatabase(): ExchangeAccountMongooseEntityGateway {
    return new ExchangeAccountMongooseEntityGateway(ExchangeAccountModel);
  }

  static getDigitalAssetMongoDatabase(digitalAssetAdapter: IDigitalAssetAdapter): DigitalAssetMongooseEntityGateway {
    return new DigitalAssetMongooseEntityGateway(DigitalAssetModel, digitalAssetAdapter);
  }

  static getDigitalAssetInMemoryDatabase(): DigitalAssetInMemoryEntityGateway {
    return new DigitalAssetInMemoryEntityGateway();
  }

  static getDigitalAssetHistoryMongoDatabase(digitalAssetAdapter: IDigitalAssetAdapter): DigitalAssetHistoryMongooseEntityGateway {
    return new DigitalAssetHistoryMongooseEntityGateway(DigitalAssetHistoryModel, digitalAssetAdapter);
  }

  static getDigitalAssetHistoryInMemoryDatabase(): DigitalAssetHistoryInMemoryEntityGateway {
    return new DigitalAssetHistoryInMemoryEntityGateway();
  }
}

export default DatabaseConfiguration;