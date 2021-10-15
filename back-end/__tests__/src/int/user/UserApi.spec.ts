import axios, { AxiosResponse } from "axios";
import { IUser } from '../../../../src/core/entities';
import makeFakeUser from '../../fixtures/UserFixture';
import { TestServer } from '../../fixtures/TestServer';
import { IUserEntityGateway } from '../../../../src/core/use-cases/user';
import { connectMongo, clearMongo, closeMongo } from "../../fixtures/DatabaseFixture";

describe('User API', () => {
  let testServer: TestServer;
  let userDatabase: IUserEntityGateway;
 
  beforeAll(async () => {
    axios.defaults.baseURL = `http://localhost:4000`;
    axios.defaults.headers.common['Content-Type'] = 'applicaton/json'
    axios.defaults.validateStatus = function (status) {
      // Throw only if the status code is greater than or equal to 500
      return status < 500;
    }

    testServer = TestServer.createTestServer();
    await connectMongo(testServer.config, testServer.logger);
    userDatabase = testServer.userDatabase;
  });
  beforeEach(async () => {
    await clearMongo();
  });

  afterAll((done) => {
    closeMongo();
    testServer.close();
    done();
  });

  describe('Registering Users', () => {
    it('Registers a new user', async () => {
      const fakeUser = makeFakeUser({});
      const response = await axios.post<IUser, AxiosResponse<IUser>>('/users/register',
        { ...fakeUser }
      );
      
      expect(response.status).toBe(201);
      const user = await userDatabase.getUser(response.data.email);
      expect(user).toBeDefined();
      if (user === undefined) return;

      expect(fakeUser.firstName).toBe(response.data.firstName);
      expect(fakeUser.lastName).toBe(response.data.lastName);
      expect(fakeUser.password).not.toBe(response.data.password);
      expect(fakeUser.username).toBe(response.data.username);
      expect(fakeUser.email).toBe(response.data.email);
    });

    it('Registration requires email', async () => {
      const fakeUser = makeFakeUser({});
      const requestBody: Partial<IUser> = { ...fakeUser };
      delete requestBody.email;
  
      const response = await axios.post('/users/register',
        requestBody
      );
  
      expect(response.status).toBe(400);
      expect(response.data.errors).toBeDefined();
    });
  
    it('Registration requires password', async () => {
      const fakeUser = makeFakeUser({});
      const requestBody: Partial<IUser> = { ...fakeUser };
      delete requestBody.password;
  
      const response = await axios.post('/users/register', requestBody);
  
      expect(response.status).toBe(400);
      expect(response.data.errors).toBeDefined();
    });
  
    /*
    it('Registration requires username', async () => {
      const fakeUser = makeFakeUser({});
      const requestBody: Partial<IUser> = { ...fakeUser };
      delete requestBody.username;
  
      const response = await axios.post('/users/register', requestBody);
  
      expect(response.status).toBe(400);
      expect(response.data.errors).toBeDefined();
    });
    */
  
    /*
    it('Registration requires firstName', async () => {
      const fakeUser = makeFakeUser({});
      const requestBody: Partial<IUser> = { ...fakeUser };
      delete requestBody.firstName;
  
      const response = await axios.post('/users/register', requestBody);
  
      expect(response.status).toBe(400);
      expect(response.data.errors).toBeDefined();
    });
  
    it('Registration requires lastName', async () => {
      const fakeUser = makeFakeUser({});
      const requestBody: Partial<IUser> = { ...fakeUser };
      delete requestBody.lastName;
  
      const response = await axios.post('/users/register', requestBody);
  
      expect(response.status).toBe(400);
      expect(response.data.errors).toBeDefined();
    });
    */

    it('Registration requires valid email (e.g. [*]@[*].[*]', async () => {
      const fakeUser = makeFakeUser({});
      const requestBody: Partial<IUser> = { ...fakeUser, email: 'test@test' };

      const response = await axios.post('/users/register', requestBody);

      expect(response.status).toBe(400);
      expect(response.data.errors).toBeDefined();
    });

    it('Does not allow duplicate emails', async () => {
      const fakeUser = makeFakeUser({});
      const fakeUser2 = makeFakeUser({});
      fakeUser2.email = fakeUser.email;

      const response = await axios.post('/users/register',
        { ...fakeUser }
      );

      expect(response.status).toBe(201);

      const response2 = await axios.post('/users/register',
        { ...fakeUser2 }
      );

      expect(response2.status).toBe(422);
      expect(response2.data.error).toBeDefined();
    });
  });

  describe('Authenticating users', () => {

    it('Authenticates newly registered user', async () => {
      const fakeUser = makeFakeUser({});
      const response = await axios.post<IUser>('/users/register', { ...fakeUser });
      
      expect(response.status).toBe(201);

      const authResponse = await axios.post('/users/authenticate', { 
          email: fakeUser.email, 
          password: fakeUser.password
        });

      expect(authResponse.status).toBe(201);
      expect(authResponse.data.token).toBeDefined();
    });

    it('Returns unauthorized if user does not exist', async () => {
      const fakeUser = makeFakeUser({});
      const response = await axios.post('/users/authenticate', { ...fakeUser });
      expect(response.status).toBe(401);
    });

    it('Returns unauthorized if password is incorrect', async () => {
      const fakeUser = makeFakeUser({});
      const response = await axios.post<IUser>('/users/register', { ...fakeUser });
      expect(response.status).toBe(201);
      const authResponse = await axios.post('/users/authenticate', { email: fakeUser.email, password: fakeUser.email });
      expect(authResponse.status).toBe(401);
    });

    it('Returns bad request if email is not in request body', async () => {
      const response = await axios.post('/users/authenticate', { password: 'password'});
      expect(response.status).toBe(400);
    });

    it('Returns bad request if password is not in request body', async () => {
      const response = await axios.post('/users/authenticate', { email: 'email' });
      expect(response.status).toBe(400);
    });
  });
});