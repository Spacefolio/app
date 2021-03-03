import { userConstants } from "../_constants";

interface IRegistrationAction {
  type: string;
  value: any;
  error: string;
}

export interface IRegistrationState {
  registering: boolean;
  registrationError: string;
}

export function registration(
  state = { registering: false },
  action: IRegistrationAction
) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return { registering: false };
    case userConstants.REGISTER_FAILURE:
      return { registering: false, registrationError: action.error };
    default:
      return state;
  }
}
