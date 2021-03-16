import { alertConstants } from '../_constants';

interface IAlertAction {
	type: string;
	message: string;
}

export interface IAlertState {
	type?: 'success' | 'error';
	message?: string;
}

export function alert(state: IAlertState = {}, action: IAlertAction) {
	switch (action.type) {
		case alertConstants.SUCCESS:
			return {
				type: 'success',
				message: action.message,
			};
		case alertConstants.ERROR:
			return {
				type: 'error',
				message: action.message,
			};
		case alertConstants.CLEAR:
			return {};
		default:
			return state;
	}
}
