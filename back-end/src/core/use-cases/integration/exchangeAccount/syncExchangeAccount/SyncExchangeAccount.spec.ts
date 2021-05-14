import { ExchangeAccountNotFound, ExchangeAccountSyncFailed, ICreateExchangeAccountPayload, IExchangeAccountEntityGateway, SyncExchangeAccountRequest, SyncExchangeAccountUseCase } from "..";
import makeFakeExchangeAccount from "../../../../../../__tests__/src/fixtures/ExchangeAccountFixture";
import { getExchange } from "../../../../../../__tests__/src/fixtures/ExchangeInteractionFixture";
import makeFakeUser from "../../../../../../__tests__/src/fixtures/UserFixture";
import { ExchangeAccountInMemoryEntityGateway, UserInMemoryEntityGateway } from "../../../../../data";
import { UseCaseError } from "../../../../definitions";
import { Exchange, IExchangeAccount } from "../../../../entities";
import { IUserEntityGateway, UserNotFound } from "../../../user";

describe('Get Exchange Account Use Case', () => {
  const userDatabase: IUserEntityGateway = new UserInMemoryEntityGateway();
  const exchangeAccountDatabase: IExchangeAccountEntityGateway = new ExchangeAccountInMemoryEntityGateway();
  const syncExchangeAccountUseCase: SyncExchangeAccountUseCase = new SyncExchangeAccountUseCase(userDatabase, exchangeAccountDatabase, getExchange);
  const syncFailsExchangeAccountUseCase: SyncExchangeAccountUseCase = new SyncExchangeAccountUseCase(userDatabase, exchangeAccountDatabase, getExchange);
  
  const fakeUser = makeFakeUser({});
  const fakeExchangeAccount: IExchangeAccount = makeFakeExchangeAccount({});

  const exchangeAccountRequest: ICreateExchangeAccountPayload = {
    accountId: fakeExchangeAccount.accountId,
    exchange: <Exchange>(fakeExchangeAccount.exchange.id),
    nickname: fakeExchangeAccount.nickname,
    credentials: fakeExchangeAccount.credentials
  }

  const request: SyncExchangeAccountRequest = {
    email: fakeUser.email,
    accountId: fakeExchangeAccount.accountId
  }

  beforeEach(async () => {
    await userDatabase.clearUsers();
    await exchangeAccountDatabase.clearExchangeAccounts();
  });

  it('Syncs a valid exchange account', async () => {

    await userDatabase.createUser(fakeUser);
    const exchangeAccount = await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    await userDatabase.addExchangeAccountForUser(fakeUser.email, exchangeAccount);

    const response = await syncExchangeAccountUseCase.execute(request);

    expect(response.isError).toBe(false);
    const account = response.getValue();
    expect(account).toBe(exchangeAccount);
  });

  it('Returns user not found error', async () => {
    await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);

    const response = await syncExchangeAccountUseCase.execute(request);

    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(UserNotFound);
  });

  it('Returns exchange account not found error when it does not exist', async () => {
    await userDatabase.createUser(fakeUser);
    const exchangeAccount = await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    await userDatabase.addExchangeAccountForUser(fakeUser.email, exchangeAccount);
    await exchangeAccountDatabase.deleteExchangeAccount(exchangeAccount.accountId);
    
    const response = await syncExchangeAccountUseCase.execute(request);
    
    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(ExchangeAccountNotFound);
  });

  it('Returns exchange account not found error when it does not belong to the user', async () => {
    await userDatabase.createUser(fakeUser);
    await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    const response = await syncExchangeAccountUseCase.execute(request);

    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(ExchangeAccountNotFound);
  });

  it('Returns sync failed on sync failure', async () => {
    await userDatabase.createUser(fakeUser);
    await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    const response = await syncFailsExchangeAccountUseCase.execute(request);

    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(ExchangeAccountSyncFailed);
  });
});