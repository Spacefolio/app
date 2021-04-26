import { Result } from "../../../definitions";
import { User } from "../../../entities";
import { RegisterUserInvalidRequest, UserAlreadyExists } from "./errors";

type RegisterUserResponse = Result<User, UserAlreadyExists | RegisterUserInvalidRequest>;

export default RegisterUserResponse;