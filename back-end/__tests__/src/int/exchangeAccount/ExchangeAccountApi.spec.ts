import axios, { AxiosResponse } from 'axios';
import { Exchange, ExchangeAccount, IUser } from '../../../../src/core/entities';
import makeFakeUser from '../../fixtures/UserFixture';
import { TestServer } from '../../fixtures/TestServer';
import { AuthenticateUserRequest, IUserEntityGateway } from '../../../../src/core/use-cases/user';
import { IExchangeAccountEntityGateway } from '../../../../src/core/use-cases/integration/exchangeAccount';
import makeFakeExchangeAccount from '../../fixtures/ExchangeAccountFixture';
import { AddExchangeAccountRequestBody } from '../../../../src/entrypoint/web/controllers';
import { connectMongo, clearMongo, closeMongo } from '../../fixtures/DatabaseFixture';

describe('Exchange Account API', () => {
	let testServer: TestServer;
	let userDatabase: IUserEntityGateway;
	let exchangeAccountDatabase: IExchangeAccountEntityGateway;
	const fakeUser = makeFakeUser({});
	const fakeExchangeAccount = makeFakeExchangeAccount({});

  const addRequest: AddExchangeAccountRequestBody = {
    exchange: fakeExchangeAccount.exchange.id as Exchange,
    nickname: fakeExchangeAccount.nickname,
    credentials: fakeExchangeAccount.credentials,
  };

	beforeAll(async () => {
		axios.defaults.baseURL = `http://localhost:4000`;
		axios.defaults.headers.common['Content-Type'] = 'applicaton/json';
		axios.defaults.validateStatus = function (status) {
			// Throw only if the status code is greater than or equal to 500
			return status < 500;
		};

		testServer = TestServer.createTestServer();
		await connectMongo(testServer.config, testServer.logger);
		userDatabase = testServer.userDatabase;
		exchangeAccountDatabase = testServer.exchangeAccountDatabase;
	});

  beforeEach(async () => {
    await clearMongo();

    await axios.post<IUser>('/users/register', { ...fakeUser });

		const authenticateUserResponse = await axios.post<AuthenticateUserRequest, AxiosResponse<{ token: string }>>('/users/authenticate', {
			email: fakeUser.email,
			password: fakeUser.password,
		});

		axios.defaults.headers.common['Authorization'] = `Bearer ${authenticateUserResponse.data.token}`;
  });

	afterAll(async (done) => {
		await closeMongo();
		await testServer.close();
		done();
	});

	describe('Add an exchange account', () => {
		it('Adds a valid exchange account to an existing user', async () => {
			const response = await axios.post('/integrations/exchanges', addRequest);

			expect(response.status).toBe(201);
			const exchangeAccount = await exchangeAccountDatabase.getExchangeAccount(response.data.accountId);
			expect(exchangeAccount).toBeDefined();
			if (exchangeAccount === undefined) return;

			expect(exchangeAccount.accountId).toBe(response.data.accountId);
			expect(fakeExchangeAccount.credentials).toStrictEqual(response.data.credentials);
			expect(fakeExchangeAccount.exchange).toEqual(response.data.exchange);
			expect(fakeExchangeAccount.nickname).toBe(response.data.nickname);

      const user = await userDatabase.getUser(fakeUser.email);
      expect(user).toBeDefined();
      if (user === undefined) return;
      expect(user.exchangeAccounts.length).toBe(1);
      expect(user.exchangeAccounts[0].accountId).toBe(exchangeAccount.accountId);
      expect(user.exchangeAccounts[0].nickname).toBe(fakeExchangeAccount.nickname);
      expect(user.exchangeAccounts[0].credentials).toStrictEqual(fakeExchangeAccount.credentials);
      expect(user.exchangeAccounts[0].exchange).toEqual(fakeExchangeAccount.exchange);
		});

		it('Adding exchange account requires exchange', async () => {
			const requestBody: Partial<AddExchangeAccountRequestBody> = { ...addRequest };
			delete requestBody.exchange;

			const response = await axios.post('/integrations/exchanges', requestBody);

			expect(response.status).toBe(400);
			expect(response.data.errors).toBeDefined();
		});

		it('Adding exchange account requires nickname', async () => {
			const requestBody: Partial<AddExchangeAccountRequestBody> = { ...addRequest };
			delete requestBody.nickname;

			const response = await axios.post('/integrations/exchanges', requestBody);

			expect(response.status).toBe(400);
			expect(response.data.errors).toBeDefined();
		});

    it('Adding exchange account requires credentials', async () => {
			const requestBody: Partial<AddExchangeAccountRequestBody> = { ...addRequest };
			delete requestBody.credentials;

			const response = await axios.post('/integrations/exchanges', requestBody);

			expect(response.status).toBe(400);
			expect(response.data.errors).toBeDefined();
		});
  });

	describe('Remove an exchange account', () => {
		it('Removes valid exchange account from existing user', async () => {
      const addResponse = await axios.post('/integrations/exchanges', addRequest);
			expect(addResponse.status).toBe(201);

      const userBeforeRemoval = await userDatabase.getUser(fakeUser.email);
      expect(userBeforeRemoval?.exchangeAccounts.length).toBe(1);

      expect((await exchangeAccountDatabase.getExchangeAccounts()).length).toBe(1);

      const removeResponse = await axios.delete(`/integrations/exchanges/${addResponse.data.accountId}`);
			expect(removeResponse.status).toBe(200);

      const userAfterRemoval = await userDatabase.getUser(fakeUser.email);
      expect(userAfterRemoval?.exchangeAccounts.length).toBe(0);

      expect((await exchangeAccountDatabase.getExchangeAccounts()).length).toBe(0);
		});

    it('Exchange account must exist', async () => {
      const addResponse = await axios.post('/integrations/exchanges', addRequest);
			expect(addResponse.status).toBe(201);

      await exchangeAccountDatabase.deleteExchangeAccount(addResponse.data.accountId);

      const removeResponse = await axios.delete(`/integrations/exchanges/${addResponse.data.accountId}`);
      expect(removeResponse.status).toBe(404);
    });

    it('Exchange account must belong to user', async () => {
      await exchangeAccountDatabase.createExchangeAccount({ ...addRequest, accountId: fakeExchangeAccount.accountId });

      const removeResponse = await axios.delete(`/integrations/exchanges/${fakeExchangeAccount.accountId}`);
      expect(removeResponse.status).toBe(404);
    });
	});

  describe('Get an exchange account', () => {
		it('Gets valid exchange account from existing user', async () => {
      const addResponse = await axios.post('/integrations/exchanges', addRequest);
			expect(addResponse.status).toBe(201);

      const getResponse = await axios.get<Readonly<ExchangeAccount>>(`/integrations/exchanges/${addResponse.data.accountId}`);
			expect(getResponse.status).toBe(200);

      expect(getResponse.data.accountId).toBe(addResponse.data.accountId);
      expect(getResponse.data.exchange.id).toBe(addRequest.exchange);
      expect(getResponse.data.nickname).toBe(addRequest.nickname);
      expect(getResponse.data.credentials).toStrictEqual(addRequest.credentials);
		});

    it('Exchange account must exist', async () => {
      const addResponse = await axios.post('/integrations/exchanges', addRequest);
			expect(addResponse.status).toBe(201);

      await exchangeAccountDatabase.deleteExchangeAccount(addResponse.data.accountId);

      const getResponse = await axios.get(`/integrations/exchanges/${addResponse.data.accountId}`);
      expect(getResponse.status).toBe(404);
    });

    it('Exchange account must belong to user', async () => {
      await exchangeAccountDatabase.createExchangeAccount({ ...addRequest, accountId: fakeExchangeAccount.accountId });

      const getResponse = await axios.get(`/integrations/exchanges/${fakeExchangeAccount.accountId}`);
      expect(getResponse.status).toBe(404);
    });
	});

  describe('Get all exchange accounts', () => {
		it('Gets all exchange accounts from existing user', async () => {
      const addResponse = await axios.post('/integrations/exchanges', addRequest);
			expect(addResponse.status).toBe(201);
      const add2Response = await axios.post('/integrations/exchanges', addRequest);
			expect(add2Response.status).toBe(201);

      const getResponse = await axios.get<Readonly<ExchangeAccount>[]>(`/integrations/exchanges`);
			expect(getResponse.status).toBe(200);

      expect(getResponse.data.length).toBe(2);
      expect(addResponse.data.accountId + add2Response.data.accountId).toContain(getResponse.data[0].accountId);
      expect(addResponse.data.accountId + add2Response.data.accountId).toContain(getResponse.data[1].accountId);
		});
	});

	describe('Get current holdings for an exchange account', () => {
		it('Gets all transactions from an existing exchange account', async () => {
			const exchangeAccount = await exchangeAccountDatabase.createExchangeAccount({ ...fakeExchangeAccount, exchange: addRequest.exchange });

			const response = await axios.get(`/integrations/exchanges/${fakeExchangeAccount.accountId}/transactions`);
			expect(response.status).toBe(200);
		});
	});

	describe('Get transactions for an exchange account', () => {
		
	});
});
