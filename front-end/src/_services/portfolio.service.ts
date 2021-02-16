import { authHeader } from "../_helpers";
import { IExchangeAccountRequest, IExchangeAccount } from "../../../types";
import axios from "axios";

export const portfolioService = {
  syncPortfolio
};

async function syncPortfolio(sync: boolean) {
  const Authorization = authHeader().Authorization;
  const requestOptions = {
    Authorization: Authorization,
  };

  return await axios
    .get(`http://localhost:4000/portfolio/${sync}`, { headers: requestOptions })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}