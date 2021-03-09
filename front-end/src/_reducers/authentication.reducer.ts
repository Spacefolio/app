import { IUser } from "../../../types";
import { userConstants } from "../_constants";

interface IUserAuthenticationActions {
  type: string;
  user?: IUser;
  username?: string;
}

export interface IAuthenticationState {
  loggedIn: boolean;
  user?: any;
}

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false };

export function authentication(
  state = initialState,
  action: IUserAuthenticationActions
) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.username,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
