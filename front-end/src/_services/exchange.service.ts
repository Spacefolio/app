import config from "config";
import { authHeader } from "../_helpers";
import { IExchangeAccountRequest, IExchangeAccount } from "../types";
import axios from "axios";

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
    "Content-Type": "application/json",
  };

  return await axios
    .get(`http://localhost:4000/exchanges`, { headers: requestOptions })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}
async function getInfo() {
  return await axios
    .get("https://s3.amazonaws.com/statics.algonex.us/exchanges.json")
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("err", err);
      return err;
    });
}

async function addNew(exchange: IExchangeAccountRequest) {
  const Authorization = authHeader().Authorization;
  const requestOptions = {
    Authorization: Authorization,
    "Content-Type": "application/json",
  };
  console.log("adding new");
  axios
    .post(`http://localhost:4000/exchanges`, exchange, {
      headers: requestOptions,
    })
    .then((response) => {
      console.log("response", response);
      return response;
    })
    .catch((err) => {
      console.log("err", err);
      return err;
    });
}

async function update(id: string, data: IExchangeAccountRequest) {
  const Authorization = authHeader().Authorization;
  const requestOptions = {
    Authorization: Authorization,
    "Content-Type": "application/json",
  };
  console.log("adding new");
  axios
    .put(`http://localhost:4000/exchanges/?id=${id}`, data, {
      headers: requestOptions,
    })
    .then((response) => {
      console.log("response", response);
      return response;
    })
    .catch((err) => {
      console.log("err", err);
      return err;
    });
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id: string) {
  const Authorization = authHeader().Authorization;
  const requestOptions = {
    Authorization: Authorization,
    "Content-Type": "application/json",
  };
  console.log("adding new");
  axios
    .delete(`http://localhost:4000/exchanges/?id=${id}`, {
      headers: requestOptions,
    })
    .then((response) => {
      console.log("response", response);
      return response;
    })
    .catch((err) => {
      console.log("err", err);
      return err;
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
