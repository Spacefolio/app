import { BaseExchange, Exchange } from "../../core/entities";
import { ExchangeAccountInMemoryEntityGateway, ExchangeAccountMongooseEntityGateway, UserInMemoryEntityGateway, UserMongooseEntityGateway, UserModel, ExchangeAccountModel, DigitalAssetMongooseEntityGateway, IDigitalAssetAdapter, DigitalAssetModel, DigitalAssetHistoryMongooseEntityGateway, DigitalAssetHistoryModel, DigitalAssetInMemoryEntityGateway, DigitalAssetHistoryInMemoryEntityGateway } from "../../data";

class DatabaseConfiguration {

  static getUserInMemoryDatabase(): UserInMemoryEntityGateway {
    return new UserInMemoryEntityGateway();
  }

  static getUserMongoDatabase(exchanges: (exchange: Exchange) => BaseExchange): UserMongooseEntityGateway {
    return new UserMongooseEntityGateway(UserModel, ExchangeAccountModel, exchanges);
  }

  static getExchangeAccountInMemoryDatabase(exchanges: (exchange: Exchange) => BaseExchange): ExchangeAccountInMemoryEntityGateway {
    return new ExchangeAccountInMemoryEntityGateway(exchanges);
  }

  static getExchangeAccountMongoDatabase(exchanges: (exchange: Exchange) => BaseExchange): ExchangeAccountMongooseEntityGateway {
    return new ExchangeAccountMongooseEntityGateway(ExchangeAccountModel, exchanges);
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