import axios from "axios";
import { authHeader } from "../_helpers";
import { IUser } from "../../../types";

export const userService = {
  login,
  logout,
  register,
  // getAll,
  getById,
  update,
  // delete: _delete
};

async function login(username: string, password: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  const response = await fetch(
    `${API_DOMAIN}/users/authenticate`,
    requestOptions
  );
  const user = await handleResponse(response);
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

function logout() {
  localStorage.removeItem("user");
}

async function getById(id: string) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    `${API_DOMAIN}}/users/${id}`,
    requestOptions
  );
  return handleResponse(response);
}

async function register(user: IUser) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  const response = await fetch(
    `${API_DOMAIN}/users/register`,
    requestOptions
  );
  return handleResponse(response);
}

async function update(user: IUser) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  const response = await fetch(
    `${API_DOMAIN}/users/${user.id}`,
    requestOptions
  );
  return handleResponse(response);
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
