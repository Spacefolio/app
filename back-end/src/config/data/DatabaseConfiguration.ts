import { ExchangeAccountInMemoryEntityGateway, ExchangeAccountMongooseEntityGateway, UserInMemoryEntityGateway, UserMongooseEntityGateway } from "../../data";

class DatabaseConfiguration {

  static getUserInMemoryDatabase(): UserInMemoryEntityGateway {
    const db = new UserInMemoryEntityGateway();
    return db;
  }

  static getUserMongoDatabase(): UserMongooseEntityGateway {
    const db = new UserMongooseEntityGateway();
    return db;
  }

  static getExchangeAccountInMemoryDatabase(): ExchangeAccountInMemoryEntityGateway {
    const db = new ExchangeAccountInMemoryEntityGateway();
    return db;
  }

  static getExchangeAccountMongoDatabase(): ExchangeAccountMongooseEntityGateway {
    const db = new ExchangeAccountMongooseEntityGateway();
    return db;
  }
}

export default DatabaseConfiguration;