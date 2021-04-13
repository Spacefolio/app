export interface IUser {
  email: string,
  username?: string,
  password: string;
  firstName?: string,
  lastName?: string,
}

export class User {
  private email: string;
  private username: string;
  private password: string;
  private firstName: string;
  private lastName: string;

  private constructor(user : IUser) {
    this.email = user.email;
    this.username = user.username || '';
    this.password = user.password;
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
  }

  public getEmail = (): string => this.email;
  public getUsername = (): string => this.username;
  public getPassword = (): string => this.password;
  public getFirstName = (): string => this.firstName;
  public getLastName = (): string => this.lastName;
  public getFullName = (): string => `${this.firstName} ${this.lastName}`;

  static buildMakeUser() {
    return function makeUser (userParams: IUser): Readonly<User>
    {
      const user: User = new User(userParams);
      return Object.freeze(user);
    }
  }
}

export default User.buildMakeUser;