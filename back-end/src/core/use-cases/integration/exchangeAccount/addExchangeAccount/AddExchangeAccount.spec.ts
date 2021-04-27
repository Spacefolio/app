import makeFakeExchangeAccount from "../../../../../../__tests__/src/fixtures/ExchangeAccountFixture";
import ExchangeAccountInMemoryEntityGateway from "../../../../../data/Integrations/exchangeAccount/ExchangeAccountInMemoryEntityGateway";
import { Exchange, ExchangeAccount, IExchangeAccount } from "../../../../entities";
import { AddExchangeAccountRequest, AddExchangeAccountUseCase, IExchangeAccountEntityGateway } from "..";
import { makeId, UserInMemoryEntityGateway } from "../../../../../data";
import { IUserEntityGateway } from "../../../user";
import makeFakeUser from "../../../../../../__tests__/src/fixtures/UserFixture";

describe('Add Exchange Account Use Case', () => {
  const userDatabase: IUserEntityGateway = new UserInMemoryEntityGateway();
  const exchangeAccountDatabase: IExchangeAccountEntityGateway = new ExchangeAccountInMemoryEntityGateway();
  const addExchangeAccountUseCase: AddExchangeAccountUseCase = new AddExchangeAccountUseCase(userDatabase, exchangeAccountDatabase, makeId);
  
  const fakeUser = makeFakeUser({});
  const fakeExchangeAccount: IExchangeAccount = makeFakeExchangeAccount({});

  beforeEach(async () => {
    await userDatabase.clearUsers();
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
  });
});