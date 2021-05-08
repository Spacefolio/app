import { GetCurrentHoldingsUseCase } from ".";
import { ExchangeAccountNotFound, ICreateExchangeAccountPayload, IExchangeAccountEntityGateway } from "..";
import makeFakeExchangeAccount from "../../../../../../__tests__/src/fixtures/ExchangeAccountFixture";
import makeFakeUser from "../../../../../../__tests__/src/fixtures/UserFixture";
import { ExchangeAccountInMemoryEntityGateway, UserInMemoryEntityGateway } from "../../../../../data";
import { UseCaseError } from "../../../../definitions";
import { Exchange, ExchangeAccount, IExchangeAccount } from "../../../../entities";
import { IUserEntityGateway, UserNotFound } from "../../../user";

describe('Get Current Holdings Use Case', () => {
  const userDatabase: IUserEntityGateway = new UserInMemoryEntityGateway();
  const exchangeAccountDatabase: IExchangeAccountEntityGateway = new ExchangeAccountInMemoryEntityGateway();
  const getCurrentHoldingsUseCase: GetCurrentHoldingsUseCase = new GetCurrentHoldingsUseCase(userDatabase, exchangeAccountDatabase);
  
  const fakeUser = makeFakeUser({});
  const fakeExchangeAccount: IExchangeAccount = makeFakeExchangeAccount({});
  let exchangeAccount: ExchangeAccount;

  const exchangeAccountRequest: ICreateExchangeAccountPayload = {
    accountId: fakeExchangeAccount.accountId,
    exchange: <Exchange>(fakeExchangeAccount.exchange.id),
    nickname: fakeExchangeAccount.nickname,
    credentials: fakeExchangeAccount.credentials,
    holdings: fakeExchangeAccount.holdings,
    transactions: fakeExchangeAccount.transactions
  }

  beforeAll(async () => {
    await userDatabase.createUser(fakeUser);
    exchangeAccount = await exchangeAccountDatabase.createExchangeAccount(exchangeAccountRequest);
    await userDatabase.addExchangeAccountForUser(fakeUser.email, exchangeAccount);
  });

  it(`Returns current holdings of a valid exchange account that belongs to the user`, async () => {
    const request = {
      email: fakeUser.email,
      accountId: fakeExchangeAccount.accountId,
    };

    const response = await getCurrentHoldingsUseCase.execute(request);

    expect(response.isError).toBe(false);
    const currentHoldings = response.getValue();
    expect(fakeExchangeAccount.holdings).toHaveLength(1);
    expect(currentHoldings).toHaveLength(1);
    expect(currentHoldings[0].asset.assetId).toEqual(exchangeAccount.holdings[0].asset.assetId);
    expect(currentHoldings[0].balance.total).toEqual(exchangeAccount.holdings[0].balance.total);
  });

  it('Returns user not found error', async () => {
    const request = {
      email: 'email',
      accountId: fakeExchangeAccount.accountId,
    };
 
    const response = await getCurrentHoldingsUseCase.execute(request);

    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(UserNotFound);
  });
  
  it('Returns exchange account not found error if user does not have exchange account', async () => {
    const request = {
      email: fakeUser.email,
      accountId: 'a',
    };
 
    const response = await getCurrentHoldingsUseCase.execute(request);

    expect(response.isError).toBe(true);
    const error = response.getError() as UseCaseError;
    expect(error).toBeInstanceOf(ExchangeAccountNotFound);
  });
});