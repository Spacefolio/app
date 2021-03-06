import { authHeader } from '../_helpers';
import { IAddExchangeAccountRequest, IExchangeAccountRequest, IExchangeAccountView } from '../../../types';
import axios from 'axios';

export const exchangeService = {
	getInfo,
	addNew,
	getAll,
	update,
	delete: _delete,
};

async function getAll() {
	const Authorization = authHeader().Authorization;
	const requestOptions = {
		Authorization: Authorization,
		'Content-Type': 'application/json',
	};

	return await axios
		.get(`${API_DOMAIN}/integrations/exchanges`, { headers: requestOptions })
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			throw err;
		});
}
async function getInfo() {
	const Authorization = authHeader().Authorization;
	const requestOptions = {
		Authorization: Authorization,
		'Content-Type': 'application/json',
	};

	return await axios
		.get(`${API_DOMAIN}/integrations/exchanges/available-exchanges`, {
			headers: requestOptions,
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log('err', err);
			throw err;
		});
}

async function addNew(exchange: IExchangeAccountRequest) {
	const Authorization = authHeader().Authorization;
	const requestOptions = {
		Authorization: Authorization,
		'Content-Type': 'application/json',
	};
	console.log('front end service', exchange);
	
	const request: IAddExchangeAccountRequest = {
		exchange: exchange.exchangeType,
		credentials: exchange.apiInfo,
		nickname: exchange.nickname || exchange.name
	}

	return await axios
		.post(`${API_DOMAIN}/integrations/exchanges`, request, {
			headers: requestOptions,
		})
		.then((response) => {
			return response.data;
		}, (error) => {
			throw error.response.data.error;
		});
}

async function update(id: string, data: IExchangeAccountRequest) {
	const Authorization = authHeader().Authorization;
	const requestOptions = {
		Authorization: Authorization,
		'Content-Type': 'application/json',
	};
	return await axios
		.put(`${API_DOMAIN}/integrations/exchanges/${id}`, data, {
			headers: requestOptions,
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			throw err;
		});
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id: string) {
	console.log('service', id);
	const Authorization = authHeader().Authorization;
	const requestOptions = {
		Authorization: Authorization,
		'Content-Type': 'application/json',
	};

	return await axios
		.delete(`${API_DOMAIN}/integrations/exchanges/${id}`, {
			headers: requestOptions,
		})
		.then((response) => {
			return response;
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
				console.log(response);
				// auto logout if 401 response returned from api
				location.reload();
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}
		console.log(data);
		return data;
	});
}
