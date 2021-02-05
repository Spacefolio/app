import config from 'config';
import { authHeader } from '../_helpers';

export const exchangeService = {
    // addNew,
    getAll,
    // getById,
    // delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    console.log('service getting exchanges');

    return fetch(`${config.get('apiUrl')}/exchanges`, requestOptions).then(handleResponse);
}

// function getById(id: any) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.get("apiUrl")}/users/${id}`, requestOptions).then(handleResponse);
// }

// async function addNew(user: any) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     const response = await fetch(`${config.get("apiUrl")}/users/register`, requestOptions);
//   return handleResponse(response);
// }


// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id: any) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(`${config.get("apiUrl")}/exchanges/${id}`, requestOptions).then(handleResponse);
// }

function handleResponse(response: any) {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
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