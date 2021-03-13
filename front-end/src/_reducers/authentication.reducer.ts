import { IUser, IUserView } from '../../../types';
import { userConstants } from '../_constants';

interface IUserAuthenticationActions {
	type: string;
	user?: IUserView;
	email?: string;
}

export interface IAuthenticationState {
	loggedIn: boolean;
	user?: IUserView;
	updatingUser: boolean;
}

let user = JSON.parse(localStorage.getItem('user'));

export function authentication(
	state: IAuthenticationState = {
		loggedIn: user? true: false,
		user: user? user: null,
		updatingUser: false,
	},
	action: IUserAuthenticationActions
) {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {
				loggingIn: true,
				user: action.email,
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

		case userConstants.UPDATE_REQUEST:
			return { ...state, updatingUser: true };
		case userConstants.UPDATE_SUCCESS:
			return { ...state, updatingUser: false, user: action.user  };
		case userConstants.UPDATE_FAILURE:
			return { ...state, updatingUser: false};
		default:
			return state;
	}
}
