import { userConstants } from '../_constants';

interface IRegistrationAction{
  type: string;
  value: any;
}

export interface IRegistrationState{
  registering: boolean;
}

export function registration(state = {}, action: IRegistrationAction) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}