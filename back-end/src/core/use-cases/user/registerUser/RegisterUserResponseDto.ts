import { Result } from "../../../definitions";
import { User } from "../../../entities";
import { RegisterUserInvalidRequest, UserAlreadyExists } from "./errors";

type RegisterUserResponseDto = Result<Readonly<User>, UserAlreadyExists | RegisterUserInvalidRequest>;

export default RegisterUserResponseDto;