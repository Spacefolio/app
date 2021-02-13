import { authHeader } from "../_helpers";
import { IExchangeAccountRequest, IExchangeAccount } from "../../../types";
import axios from "axios";

export const portfolioService = {
  syncExchanges,
};

async function syncExchanges() {
  const Authorization = authHeader().Authorization;
  const requestOptions = {
    Authorization: Authorization,
  };

  return await axios
    .post(`http://localhost:4000/exchanges/sync`,{}, { headers: requestOptions })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
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
