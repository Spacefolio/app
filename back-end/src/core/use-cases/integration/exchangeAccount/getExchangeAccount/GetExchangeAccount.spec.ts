import makeFakeExchangeAccount from "../../../../../../__tests__/src/fixtures/ExchangeAccountFixture";
import { Exchange, IExchangeAccount } from "../../../../entities";
import { ICreateExchangeAccountPayload, IExchangeAccountEntityGateway } from "..";
import { ExchangeAccountInMemoryEntityGateway, UserInMemoryEntityGateway } from "../../../../../data";
import { IUserEntityGateway, UserNotFound } from "../../../user";
import makeFakeUser from "../../../../../../__tests__/src/fixtures/UserFixture";
import { UseCaseError } from "../../../../definitions";
import { ExchangeAccountNotFound } from "../../../common/errors";
import { GetExchangeAccountRequest, GetExchangeAccountUseCase } from ".";
import { getExchange } from "../../../../../../__tests__/src/fixtures/ExchangeInteractionFixture";

describe('Get Exchange Account Use Case', () => {
  const userDatabase: IUserEntityGateway = new UserInMemoryEntityGateway();
  const exchangeAccountDatabase: IExchangeAccountEntityGateway = new ExchangeAccountInMemoryEntityGateway(getExchange);
  const getExchangeAccountUseCase: GetExchangeAccountUseCase = new GetExchangeAccountUseCase(userDatabase, exchangeAccountDatabase);
  
  const fakeUser = makeFakeUser({});
  const fakeExchangeAccount: IExchangeAccount = makeFakeExchangeAccount({});

  const exchangeAccountRequest: ICreateExchangeAccountPayload = {
    accountId: fakeExchangeAccount.accountId,
    exchange: <Exchange>(fakeExchangeAccount.exchange.id),
    nickname: fakeExchangeAccount.nickname,
    credentials: fakeExchangeAccount.credentials
  }

  const request: GetExchangeAccountRequest = {
    email: fakeUser.email,
    accountId: fakeExchangeAccount.accountId
  }

  beforeEach(async () => {
    await userDatabase.clearUsers();
    await exchangeAccountDatabase.clearExchangeAccounts();
  });

  it('Returns a valid exchange account', async () => {

    await userDatabase.createUser(fakeUser);
    const exchangeAccount = await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    await userDatabase.addExchangeAccountForUser(fakeUser.email, exchangeAccount);

    const response = await getExchangeAccountUseCase.execute(request);

    expect(response.isError).toBe(false);
    const account = response.getValue();
    expect(account).toBe(exchangeAccount);
  });

  it('Returns user not found error', async () => {
    await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);

    const response = await getExchangeAccountUseCase.execute(request);

    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(UserNotFound);
  });

  it('Returns exchange account not found error when it does not exist', async () => {
    await userDatabase.createUser(fakeUser);
    const exchangeAccount = await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    await userDatabase.addExchangeAccountForUser(fakeUser.email, exchangeAccount);
    await exchangeAccountDatabase.deleteExchangeAccount(exchangeAccount.accountId);
    
    const response = await getExchangeAccountUseCase.execute(request);
    
    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(ExchangeAccountNotFound);
  });

  it('Returns exchange account not found error when it does not belong to the user', async () => {
    await userDatabase.createUser(fakeUser);
    await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    const response = await getExchangeAccountUseCase.execute(request);

    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(ExchangeAccountNotFound);
  });
});