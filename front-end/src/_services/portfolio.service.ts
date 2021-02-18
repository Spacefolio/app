import { authHeader } from "../_helpers";
import { IExchangeAccountRequest, IExchangeAccountView } from "../../../types";
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
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}