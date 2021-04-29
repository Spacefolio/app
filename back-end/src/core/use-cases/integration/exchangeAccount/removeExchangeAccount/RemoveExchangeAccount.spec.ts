import { RemoveExchangeAccountRequest } from ".";
import { ICreateExchangeAccountPayload, IExchangeAccountEntityGateway } from "..";
import makeFakeExchangeAccount from "../../../../../../__tests__/src/fixtures/ExchangeAccountFixture";
import makeFakeUser from "../../../../../../__tests__/src/fixtures/UserFixture";
import { ExchangeAccountInMemoryEntityGateway, UserInMemoryEntityGateway } from "../../../../../data";
import { UseCaseError } from "../../../../definitions";
import { Exchange, IExchangeAccount } from "../../../../entities";
import { IUserEntityGateway, UserNotFound } from "../../../user";
import { ExchangeAccountNotFound } from "./errors";
import RemoveExchangeAccountUseCase from "./RemoveExchangeAccount";

describe('Remove Exchange Account Use Case', () => {
  const userDatabase: IUserEntityGateway = new UserInMemoryEntityGateway();
  const exchangeAccountDatabase: IExchangeAccountEntityGateway = new ExchangeAccountInMemoryEntityGateway();
  const removeExchangeAccountUseCase: RemoveExchangeAccountUseCase = new RemoveExchangeAccountUseCase(userDatabase, exchangeAccountDatabase);
  
  const fakeUser = makeFakeUser({});
  const fakeExchangeAccount: IExchangeAccount = makeFakeExchangeAccount({});
  
  const exchangeAccountRequest: ICreateExchangeAccountPayload = {
    accountId: fakeExchangeAccount.accountId,
    exchange: <Exchange>(fakeExchangeAccount.exchange.id),
    nickname: fakeExchangeAccount.nickname,
    credentials: fakeExchangeAccount.credentials
  }

  const request: RemoveExchangeAccountRequest = {
    email: fakeUser.email,
    accountId: fakeExchangeAccount.accountId
  }

  beforeEach(async () => {
    await userDatabase.clearUsers();
    await exchangeAccountDatabase.clearExchangeAccounts();
  });

  it('Removes an existing exchange account', async () => {
    const user = await userDatabase.createUser(fakeUser);
    const exchangeAccount = await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    await userDatabase.addExchangeAccountForUser(fakeUser.email, exchangeAccount);

    const existsBeforeRemoval = await exchangeAccountDatabase.exists(fakeExchangeAccount.accountId);
    expect(existsBeforeRemoval).toBe(true);

    const updatedUser = await userDatabase.getUser(fakeUser.email);
    expect(updatedUser).toBeDefined();
    if (!updatedUser) return;
    expect(updatedUser.exchangeAccounts.length).toBe(1);

    const response = await removeExchangeAccountUseCase.execute(request);

    expect(response.isError).toBe(false);
    const account = response.getValue();

    const existsAfterRemoval = await exchangeAccountDatabase.exists(account.accountId);
    expect(existsAfterRemoval).toBe(false);

    const accountlessUser = await userDatabase.getUser(user.email);
    expect(accountlessUser).toBeDefined();
    if (!accountlessUser) return;
    expect(accountlessUser.exchangeAccounts.length).toBe(0);
  });

  it('Returns user not found error', async () => {
    const response = await removeExchangeAccountUseCase.execute(request);
    
    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;

    expect(error).toBeInstanceOf(UserNotFound);
  });

  it('Returns exchange account not found error when it does not exist', async () => {
    await userDatabase.createUser(fakeUser);
    const exchangeAccount = await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    await userDatabase.addExchangeAccountForUser(fakeUser.email, exchangeAccount);
    await exchangeAccountDatabase.deleteExchangeAccount(exchangeAccount.accountId);
    const response = await removeExchangeAccountUseCase.execute(request);
    
    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(ExchangeAccountNotFound);
  });

  it('Returns exchange account not found error when it does not belong to the user', async () => {
    await userDatabase.createUser(fakeUser);
    await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    const response = await removeExchangeAccountUseCase.execute(request);

    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(ExchangeAccountNotFound);
  });
});
