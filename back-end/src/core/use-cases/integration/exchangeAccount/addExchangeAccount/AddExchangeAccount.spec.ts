import makeFakeExchangeAccount from "../../../../../../__tests__/src/fixtures/ExchangeAccountFixture";
import ExchangeAccountInMemoryEntityGateway from "../../../../../data/Integrations/exchangeAccount/ExchangeAccountInMemoryEntityGateway";
import { Exchange, ExchangeAccount, IExchangeAccount, User } from "../../../../entities";
import { AddExchangeAccountRequest, AddExchangeAccountUseCase, IExchangeAccountEntityGateway } from "..";
import { makeId, UserInMemoryEntityGateway } from "../../../../../data";
import { IUserEntityGateway, UserNotFound } from "../../../user";
import makeFakeUser from "../../../../../../__tests__/src/fixtures/UserFixture";
import { UseCaseError } from "../../../../definitions";

describe('Add Exchange Account Use Case', () => {
  const userDatabase: IUserEntityGateway = new UserInMemoryEntityGateway();
  const exchangeAccountDatabase: IExchangeAccountEntityGateway = new ExchangeAccountInMemoryEntityGateway();
  const addExchangeAccountUseCase: AddExchangeAccountUseCase = new AddExchangeAccountUseCase(userDatabase, exchangeAccountDatabase, makeId);
  
  const fakeUser = makeFakeUser({});
  const fakeExchangeAccount: IExchangeAccount = makeFakeExchangeAccount({});

  beforeEach(async () => {
    await userDatabase.clearUsers();
    await exchangeAccountDatabase.clearExchangeAccounts();
  });

  it('Adds a valid exchange account', async () => {

    const user = await userDatabase.createUser(fakeUser);
    expect(user.exchangeAccounts.length).toBe(0);

    const exchangeAccountRequest: AddExchangeAccountRequest = {
      email: fakeUser.email,
      exchange: <Exchange>(fakeExchangeAccount.exchange.id),
      nickname: fakeExchangeAccount.nickname,
      credentials: fakeExchangeAccount.credentials
    }

    const response = await addExchangeAccountUseCase.execute(exchangeAccountRequest);
    expect(response.isError).toBe(false);

    const account: ExchangeAccount = response.getValue();

    const exists = await exchangeAccountDatabase.exists(account.accountId);
    expect(exists).toBe(true);

    const updatedUser = await userDatabase.getUser(user.email);
    expect(updatedUser).toBeDefined();

    if (!updatedUser) return;
    expect(updatedUser.exchangeAccounts.length).toBe(1);
  });

  it('Returns user not found error', async () => {
    const exchangeAccountRequest: AddExchangeAccountRequest = {
      email: fakeUser.email,
      exchange: <Exchange>(fakeExchangeAccount.exchange.id),
      nickname: fakeExchangeAccount.nickname,
      credentials: fakeExchangeAccount.credentials
    }

    const response = await addExchangeAccountUseCase.execute(exchangeAccountRequest);

    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(UserNotFound);
    const exchangeAccounts = await exchangeAccountDatabase.getExchangeAccounts();
    expect(exchangeAccounts.length).toBe(0);
  });
});