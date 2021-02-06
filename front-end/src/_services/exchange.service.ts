import config from "config";
import { authHeader } from "../_helpers";
import { exchangeData } from "../types";
import axios from "axios";

export const exchangeService = {
  addNew,
  getAll,
  update,
  delete: _delete,
};

async function getAll() {
  console.log("get all service");

  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  axios
    .get(`https://google.com`)
    .then((response) => {
      console.log(response);
      return(response);
    });
}

async function addNew(exchange: exchangeData) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(exchange),
  };
  const response = await fetch(
    `${"http://localhost:4000"}/exchanges`,
    requestOptions
  );

  return handleResponse(response);
}

async function update(exchange: exchangeData) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(exchange),
  };
  const response = await fetch(
    `${"http://localhost:4000"}/exchanges`,
    requestOptions
  );
  return handleResponse(response);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id: any) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const response = await fetch(
    `${config.get("apiUrl")}/exchanges/${id}`,
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
        location.reload();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    console.log(data);
    return data;
  });
}
