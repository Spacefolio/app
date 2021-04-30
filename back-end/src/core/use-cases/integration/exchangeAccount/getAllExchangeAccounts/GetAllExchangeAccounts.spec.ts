import makeFakeExchangeAccount from "../../../../../../__tests__/src/fixtures/ExchangeAccountFixture";
import { Exchange, IExchangeAccount } from "../../../../entities";
import { ICreateExchangeAccountPayload, IExchangeAccountEntityGateway } from "..";
import { ExchangeAccountInMemoryEntityGateway, UserInMemoryEntityGateway } from "../../../../../data";
import { IUserEntityGateway, UserNotFound } from "../../../user";
import makeFakeUser from "../../../../../../__tests__/src/fixtures/UserFixture";
import { UseCaseError } from "../../../../definitions";
import { GetAllExchangeAccountsRequest, GetAllExchangeAccountsUseCase } from ".";

describe('Get All Exchange Accounts Use Case', () => {
  const userDatabase: IUserEntityGateway = new UserInMemoryEntityGateway();
  const exchangeAccountDatabase: IExchangeAccountEntityGateway = new ExchangeAccountInMemoryEntityGateway();
  const getAllExchangeAccountsUseCase: GetAllExchangeAccountsUseCase = new GetAllExchangeAccountsUseCase(userDatabase, exchangeAccountDatabase);
  
  const fakeUser = makeFakeUser({});
  const fakeExchangeAccount: IExchangeAccount = makeFakeExchangeAccount({});
  const fakeExchangeAccount2: IExchangeAccount = makeFakeExchangeAccount({});

  const exchangeAccountRequest: ICreateExchangeAccountPayload = {
    accountId: fakeExchangeAccount.accountId,
    exchange: <Exchange>(fakeExchangeAccount.exchange.id),
    nickname: fakeExchangeAccount.nickname,
    credentials: fakeExchangeAccount.credentials
  }

  const exchangeAccountRequest2: ICreateExchangeAccountPayload = {
    accountId: fakeExchangeAccount2.accountId,
    exchange: <Exchange>(fakeExchangeAccount2.exchange.id),
    nickname: fakeExchangeAccount2.nickname,
    credentials: fakeExchangeAccount2.credentials
  }

  const request: GetAllExchangeAccountsRequest = {
    email: fakeUser.email
  }

  beforeEach(async () => {
    await userDatabase.clearUsers();
    await exchangeAccountDatabase.clearExchangeAccounts();
  });

  it(`Returns all of the user's exchange accounts`, async () => {

    await userDatabase.createUser(fakeUser);
    const exchangeAccount = await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    const exchangeAccount2 = await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest2);

    await userDatabase.addExchangeAccountForUser(fakeUser.email, exchangeAccount);
    await userDatabase.addExchangeAccountForUser(fakeUser.email, exchangeAccount2);

    const response = await getAllExchangeAccountsUseCase.execute(request);

    expect(response.isError).toBe(false);
    const accounts = response.getValue();
    expect(accounts).toEqual([exchangeAccount, exchangeAccount2]);
  });

  it('Returns user not found error', async () => {
    await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);

    const response = await getAllExchangeAccountsUseCase.execute(request);

    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(UserNotFound);
  });
});