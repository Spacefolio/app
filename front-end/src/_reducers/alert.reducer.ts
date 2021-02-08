import { alertConstants } from '../_constants';

interface IAlertAction {
  type: string;
  message: string;
}

export function alert(state = {}, action: IAlertAction) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}