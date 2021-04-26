interface RegisterUserRequest {
  username?: string,
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  permissionLevel?: number;
}

export default RegisterUserRequest;