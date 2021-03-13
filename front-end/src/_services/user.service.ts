import axios from 'axios';
import { authHeader } from '../_helpers';
import {
	ILoginRequest,
	INewUser,
	IUser,
	IUserUpdateRequest,
	IUserView,
} from '../../../types';

export const userService = {
	login,
	logout,
	register,
	getById,
	update,
	registrationCheck,
};

async function login(user: ILoginRequest) {
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};

	const response = await fetch(
		`${API_DOMAIN}/users/authenticate`,
		requestOptions
	);
	const userData = await handleResponse(response);
	// store user details and jwt token in local storage to keep user logged in between page refreshes
	localStorage.setItem('user', JSON.stringify(userData));

	return userData;
}

function logout() {
	localStorage.removeItem('user');
	localStorage.removeItem('Portfolio');
}

async function getById(id: string) {
	const requestOptions: RequestInit = {
		method: 'GET',
		headers: authHeader(),
	};

	const response = await fetch(`${API_DOMAIN}}/users/${id}`, requestOptions);
	return handleResponse(response);
}

async function register(user: INewUser) {
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};

	const response = await fetch(`${API_DOMAIN}/users/register`, requestOptions);
	return handleResponse(response);
}

async function registrationCheck(email: string) {
	return await axios
		.post(`${API_DOMAIN}/users/registration-check`, { email })
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			throw err;
		});
}

async function update(user: IUserUpdateRequest): Promise<IUserUpdateRequest> {
	const userSession: IUserView = await JSON.parse(localStorage.getItem('user'));

	const Authorization = authHeader().Authorization;
	const requestOptions = {
		Authorization: Authorization,
		'Content-Type': 'application/json',
	};

	return await axios
		.put(
			`${API_DOMAIN}/users/${user.id}`,
			{ user },
			{ headers: requestOptions }
		)
		.then(() => {
			localStorage.setItem(
				'user',
				JSON.stringify({ ...user, token: userSession.token })
			);
			return user;
		})
		.catch((err) => {
			throw err;
		});
}

function handleResponse(response: any) {
	return response.text().then((text: string) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout();
				location.reload();
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
