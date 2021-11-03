import { ExchangeAccountNotFound, ExchangeAccountSyncFailed, ICreateExchangeAccountPayload, IExchangeAccountEntityGateway, SyncExchangeAccountRequest, SyncExchangeAccountUseCase } from "..";
import makeFakeExchangeAccount from "../../../../../../__tests__/src/fixtures/ExchangeAccountFixture";
import { getExchange, getExchangeThatFails } from "../../../../../../__tests__/src/fixtures/ExchangeInteractionFixture";
import makeFakeUser from "../../../../../../__tests__/src/fixtures/UserFixture";
import { DigitalAssetInMemoryEntityGateway, ExchangeAccountInMemoryEntityGateway, UserInMemoryEntityGateway } from "../../../../../data";
import DigitalAssetHistoryInMemoryEntityGateway from "../../../../../data/Integrations/DigitalAsset/DigitalAssetHistoryInMemoryEntityGateway";
import { UseCaseError } from "../../../../definitions";
import { Exchange, IExchangeAccount } from "../../../../entities";
import { IUserEntityGateway, UserNotFound } from "../../../user";
import { IDigitalAssetEntityGateway, IDigitalAssetHistoryEntityGateway } from "../../digitalAsset";

describe('Get Exchange Account Use Case', () => {
  const userDatabase: IUserEntityGateway = new UserInMemoryEntityGateway();
  const exchangeAccountDatabase: IExchangeAccountEntityGateway = new ExchangeAccountInMemoryEntityGateway(getExchange);
  const digitalAssetDatabase: IDigitalAssetEntityGateway = new DigitalAssetInMemoryEntityGateway();
  const digitalAssetHistoryDatabase: IDigitalAssetHistoryEntityGateway = new DigitalAssetHistoryInMemoryEntityGateway();
  const syncExchangeAccountUseCase: SyncExchangeAccountUseCase = new SyncExchangeAccountUseCase(userDatabase, exchangeAccountDatabase, digitalAssetDatabase, digitalAssetHistoryDatabase, getExchange);
  const syncFailsExchangeAccountUseCase: SyncExchangeAccountUseCase = new SyncExchangeAccountUseCase(userDatabase, exchangeAccountDatabase, digitalAssetDatabase, digitalAssetHistoryDatabase, getExchangeThatFails);
  
  const fakeUser = makeFakeUser({});
  const fakeUser2 = makeFakeUser({});
  const fakeUser3 = makeFakeUser({});
  const fakeExchangeAccount: IExchangeAccount = makeFakeExchangeAccount({});
  const fakeExchangeAccount2: IExchangeAccount = makeFakeExchangeAccount({});
  const fakeExchangeAccount3: IExchangeAccount = makeFakeExchangeAccount({});

  const exchangeAccountRequest: ICreateExchangeAccountPayload = {
    accountId: fakeExchangeAccount.accountId,
    exchange: <Exchange>(fakeExchangeAccount.exchange.id),
    nickname: fakeExchangeAccount.nickname,
    credentials: fakeExchangeAccount.credentials,
    transactions: fakeExchangeAccount.transactions,
    holdings: fakeExchangeAccount.holdings,
    orders: fakeExchangeAccount.orders,
    openOrders: fakeExchangeAccount.openOrders,
    dailyTimeslices: fakeExchangeAccount.dailyTimeslices,
    hourlyTimeslices: fakeExchangeAccount.hourlyTimeslices
  }

  const exchangeAccountRequest2: ICreateExchangeAccountPayload = {
    accountId: fakeExchangeAccount2.accountId,
    exchange: <Exchange>(fakeExchangeAccount2.exchange.id),
    nickname: fakeExchangeAccount2.nickname,
    credentials: fakeExchangeAccount2.credentials,
    transactions: fakeExchangeAccount2.transactions,
    holdings: fakeExchangeAccount2.holdings,
    orders: fakeExchangeAccount2.orders,
    openOrders: fakeExchangeAccount2.openOrders,
    dailyTimeslices: fakeExchangeAccount2.dailyTimeslices,
    hourlyTimeslices: fakeExchangeAccount2.hourlyTimeslices
  }

  const exchangeAccountRequest3: ICreateExchangeAccountPayload = {
    accountId: fakeExchangeAccount3.accountId,
    exchange: <Exchange>(fakeExchangeAccount3.exchange.id),
    nickname: fakeExchangeAccount3.nickname,
    credentials: fakeExchangeAccount3.credentials,
    transactions: fakeExchangeAccount3.transactions,
    holdings: fakeExchangeAccount3.holdings,
    orders: fakeExchangeAccount3.orders,
    openOrders: fakeExchangeAccount3.openOrders,
    dailyTimeslices: fakeExchangeAccount3.dailyTimeslices,
    hourlyTimeslices: fakeExchangeAccount3.hourlyTimeslices
  }

  const request: SyncExchangeAccountRequest = {
    email: fakeUser.email,
    accountId: fakeExchangeAccount.accountId
  }

  const request2: SyncExchangeAccountRequest = {
    email: fakeUser2.email,
    accountId: fakeExchangeAccount2.accountId
  }

  const request3: SyncExchangeAccountRequest = {
    email: fakeUser3.email,
    accountId: fakeExchangeAccount3.accountId
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
    expect(account.holdings.length).toBe(2);
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
    const exchangeAccount = await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    await userDatabase.addExchangeAccountForUser(fakeUser.email, exchangeAccount);
    const response = await syncFailsExchangeAccountUseCase.execute(request);

    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(ExchangeAccountSyncFailed);
  });

  it('Updates holdings', async () => {
    await userDatabase.createUser(fakeUser2);
    const exchangeAccount2 = await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest2);
    await userDatabase.addExchangeAccountForUser(fakeUser2.email, exchangeAccount2);

    const response = await syncExchangeAccountUseCase.execute(request2);

    expect(response.isError).toBe(false);
    const account = response.getValue();
    expect(account.holdings[0].total.amount.bought).toBe(10);
    expect(account.holdings[0].total.amount.sold).toBe(5);
    expect(account.holdings[0].total.averageSellPrice.USD).toBe(15000);
    expect(account.holdings[0].snapshots.length).toBe(3);
  });

  it('Creates daily and hourly timeslices', async () => {
    await userDatabase.createUser(fakeUser3);
    const exchangeAccount2 = await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest3);
    await userDatabase.addExchangeAccountForUser(fakeUser3.email, exchangeAccount2);

    const response = await syncExchangeAccountUseCase.execute(request3);

    expect(response.isError).toBe(false);
    const account = response.getValue();
    expect(account.dailyTimeslices.size).toBeGreaterThan(0);
    //expect(account.hourlyTimeslices.size).toBeGreaterThan(0);
  });
});