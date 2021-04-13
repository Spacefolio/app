import faker from 'faker';
import { IUser } from '../../../src/core/entities';

export default function makeFakeUser (overrides: Partial<IUser>): IUser {
  const userParams: IUser = {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.random.alphaNumeric(10),
  };

  return { ...userParams, ...overrides };
}