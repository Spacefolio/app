import { RegisterUserResponse, UserAlreadyExists, IUserEntityGateway } from "..";
import makeFakeUser from "../../../../../__tests__/src/fixtures/UserFixture";
import { UserInMemoryEntityGateway } from "../../../../data";
import RegisterUserUseCase from "./RegisterUser";
import { IUser, User } from "../../../entities";
import { UseCaseError } from "../../../definitions";

describe('Register User Use Case', () => {
  const userDatabase: IUserEntityGateway = new UserInMemoryEntityGateway();
  const registerUserUseCase: RegisterUserUseCase = new RegisterUserUseCase(userDatabase);

  it('Registers a valid user', async () => {
      const fakeUser = makeFakeUser({});
      const response: RegisterUserResponse = await registerUserUseCase.execute(fakeUser);
      
      expect(response.isError).toBeFalsy();

      const createdUser: User = response.getValue();
      expect(createdUser).toMatchObject<IUser>(fakeUser);
  });

  it('Requires unique email', async () => {
    const fakeUser = makeFakeUser({});
    userDatabase.createUser(fakeUser);

    const response = await registerUserUseCase.execute(fakeUser);

    expect(response.isError).toBeTruthy();
    
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(UserAlreadyExists);
  });
});