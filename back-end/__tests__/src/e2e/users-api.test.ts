import axios from "axios";
import { DatabaseConfiguration } from "../../../src/config/data";
import { IUser, User } from "../../../src/core/entities";
import makeFakeUser from '../fixtures/user';


describe('Users API', () => {
  let db = DatabaseConfiguration.getUserInMemoryDatabase();

  beforeAll(() => {
    axios.defaults.baseURL = `http://localhost:4000`;
    axios.defaults.headers.common['Content-Type'] = 'applicaton/json'
    axios.defaults.validateStatus = function (status) {
      // Throw only if the status code is greater than or equal to 500
      return status < 500;
    }
    
  });
  afterAll(() => {
    db = DatabaseConfiguration.getUserInMemoryDatabase();
  });

  describe('Registering Users', () => {
    it('Registers a new user', async () => {
      const fakeUser = makeFakeUser({});
      const response = await axios.post<Readonly<User>>('/users/register',
        { ...fakeUser }
      );
      
      expect(response.status).toBe(201);
      const user = await db.getUser(response.data.getEmail());
      expect(user).toBeDefined();
      if (user === undefined) return;

      expect(fakeUser.firstName).toBe(response.data.getFirstName());
      expect(fakeUser.lastName).toBe(response.data.getLastName());
      expect(fakeUser.password).not.toBe(response.data.getPassword());
      expect(fakeUser.username).toBe(response.data.getUsername());
      expect(fakeUser.email).toBe(response.data.getEmail());
    });
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
});