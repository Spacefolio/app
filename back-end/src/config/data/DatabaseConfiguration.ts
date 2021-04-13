import { UserInMemoryEntityGateway, UserMongooseEntityGateway } from "../../data";

class DatabaseConfiguration {

  static getUserInMemoryDatabase(): UserInMemoryEntityGateway {
    const db = new UserInMemoryEntityGateway();
    return db;
  }

  static getUserMongoDatabase(): UserMongooseEntityGateway {
    const db = new UserMongooseEntityGateway();
    return db;
  }
}

export default DatabaseConfiguration;