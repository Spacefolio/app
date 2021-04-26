import { RegisterUserResponse, UserEntityGateway } from "..";
import makeFakeUser from "../../../../../__tests__/src/fixtures/UserFixture";
import { UserInMemoryEntityGateway } from "../../../../data";
import { UseCaseError } from "../../../definitions";
import { IUser } from "../../../entities";
import AuthenticateUserUseCase from "./AuthenticateUser";
import { InvalidCredentials, UserNotFound } from "./errors";

describe('Authenticate User Use Case', () => {
  const userDatabase: UserEntityGateway = new UserInMemoryEntityGateway();
  const authenticateUserUseCase: AuthenticateUserUseCase = new AuthenticateUserUseCase(userDatabase, async (hash, pass) => hash===pass);
  const fakeUser = makeFakeUser({});

  beforeEach(async () => {
    await userDatabase.clearUsers();
  });

  it('Passes authentication with valid credentials', async () => {
    await userDatabase.createUser(fakeUser);
    const response: RegisterUserResponse = await authenticateUserUseCase.execute(fakeUser);

    expect(response.isError).toBeFalsy();
    expect(response.getValue()).toMatchObject<IUser>(fakeUser);
  });

  it('Fails authentication with invalid credentials', async () => {
    await userDatabase.createUser(fakeUser);
    const request = { ...fakeUser, password:'a' };
    const response = await authenticateUserUseCase.execute(request);

    expect(response.isError).toBeTruthy();
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(InvalidCredentials);
  });

  it('Fails authentication if user does not exist', async () => {
    const response = await authenticateUserUseCase.execute({ ...fakeUser });
    expect(response.isError).toBeTruthy();
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(UserNotFound);
  })
});