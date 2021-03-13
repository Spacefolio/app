import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions, portfolioActions } from '.';
import { history } from '../_helpers';
import {
	ILoginRequest,
	INewUser,
	IUser,
	IUserUpdateRequest,
	IUserView,
} from '../../../types';
import { Redirect } from 'react-router';

export const userActions = {
	login,
	logout,
	register,
	update,
	// getAll,
	// delete: _delete
};

function login(user: ILoginRequest) {
	return (dispatch: any) => {
		dispatch(request(user.email));

		userService.login(user).then(
			(user) => {
				dispatch(success(user));
				dispatch(portfolioActions.sync());
				history.push('/dashboard');
			},
			(error: Error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.message));
			}
		);
	};

	function request(email: string) {
		return { type: userConstants.LOGIN_REQUEST, email };
	}
	function success(user: any) {
		return { type: userConstants.LOGIN_SUCCESS, user };
	}
	function failure(error: any) {
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}

function logout() {
	userService.logout();
	return { type: userConstants.LOGOUT };
}

function register(user: INewUser) {
	return (dispatch: any) => {
		dispatch(request(user));

		userService
			.register(user)
			.then((user) => {
				dispatch(success(user));
				dispatch(alertActions.success('Registration successful'));
				history.push('/');
			})
			.catch((error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			});
	};

	function request(user: INewUser) {
		return { type: userConstants.REGISTER_REQUEST, user };
	}
	function success(user: IUserView) {
		return { type: userConstants.REGISTER_SUCCESS, user };
	}
	function failure(error: string) {
		return { type: userConstants.REGISTER_FAILURE, error };
	}
}

function update(user: IUserUpdateRequest) {
	return (dispatch: any) => {
		dispatch(request(user));

		userService
			.update(user)
			.then((user: IUserUpdateRequest) => {
				dispatch(success(user));
				dispatch(alertActions.success('Update successful'));
			})
			.catch((error: Error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.message));
			});
	};

	function request(user: IUserUpdateRequest) {
		return { type: userConstants.UPDATE_REQUEST, user };
	}
	function success(user: IUserUpdateRequest) {
		return { type: userConstants.UPDATE_SUCCESS, user };
	}
	function failure(error: string) {
		return { type: userConstants.UPDATE_FAILURE, error };
	}
}

// function getAll() {
//     return dispatch => {
//         dispatch(request());

//         userService.getAll()
//             .then(
//                 users => dispatch(success(users)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };

//     function request() { return { type: userConstants.GETALL_REQUEST } }
//     function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
// }

// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//         userService.delete(id)
//             .then(
//                 user => dispatch(success(id)),
//                 error => dispatch(failure(id, error.toString()))
//             );
//     };

//     function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }
