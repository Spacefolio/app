import { authHeader } from "../_helpers";
import {
  IExchangeAccountRequest,
  IExchangeAccountView,
  IPortfolioDataView,
  IPortfolioLineChartItem,
} from "../../../types";
import axios from "axios";
import { timeframe } from "../../../types";
import { plugins } from "../../webpack.config";

export const portfolioService = {
  syncPortfolio,
  getTransactionData,
  getPortfolioChartData,
  refreshPortfolio,
  getOpenOrdersData,
};

async function syncPortfolio() {
  const Authorization = authHeader().Authorization;
  const requestOptions = {
    Authorization: Authorization,
  };

  return await axios
    .post<IPortfolioDataView>(
      `${API_DOMAIN}/portfolios/sync`,
      {},
      { headers: requestOptions }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
async function refreshPortfolio() {
  const Authorization = authHeader().Authorization;
  const requestOptions = {
    Authorization: Authorization,
  };

  return await axios
    .get(`${API_DOMAIN}/portfolios`, { headers: requestOptions })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

async function getPortfolioData(timeframe: string, exchangeId: string = "") {
  const Authorization = authHeader().Authorization;
  const requestOptions = {
    Authorization: Authorization,
  };

  return await axios
    .get(`${API_DOMAIN}/portfolios/${exchangeId}`, {
      headers: requestOptions,
      params: { timeframe },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

async function getTransactionData(exchangeID?: string) {
  const Authorization = authHeader().Authorization;
  const requestOptions = {
    Authorization: Authorization,
  };

  return await axios
    .get(
      `${API_DOMAIN}/portfolios${exchangeID != undefined ? "/" + exchangeID + "/" : "/"}transactions`,
      {
        headers: requestOptions,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

async function getOpenOrdersData(exchangeID?: string) {
  const Authorization = authHeader().Authorization;
  const requestOptions = {
    Authorization: Authorization,
  };

  return await axios
    .get(
      `${API_DOMAIN}/portfolios${
        exchangeID != undefined ? "/" + exchangeID : "/"
      }open-orders/`,
      {
        headers: requestOptions,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

const data: IPortfolioLineChartItem[] = [
  {
    T: 1613062879467,
    USD: 0.009846720826306745,
  },
  {
    T: 1613070070115,
    USD: 0.009846781245782145,
  },
  {
    T: 1613073670731,
    USD: 0.009847888833915368,
  },
  {
    T: 1613080870980,
    USD: 0.00984026980064918,
  },
  {
    T: 1613084470413,
    USD: 0.00984679191945057,
  },
  {
    T: 1613091672948,
    USD: 0.009849576703648178,
  },
  {
    T: 1613095271906,
    USD: 0.009853247520986376,
  },
  {
    T: 1613098872938,
    USD: 0.00984905036074519,
  },
  {
    T: 1613102473181,
    USD: 0.00984633907747548,
  },
  {
    T: 1613106071313,
    USD: 0.009843953204669315,
  },
  {
    T: 1613109669958,
    USD: 0.009843581921861121,
  },
  {
    T: 1613113268128,
    USD: 0.009844625826653162,
  },
  {
    T: 1613120467911,
    USD: 0.009842429688847654,
  },
  {
    T: 1613124069720,
    USD: 0.009844408575809658,
  },
  {
    T: 1613127671443,
    USD: 0.009844729150953939,
  },
  {
    T: 1613134869060,
    USD: 0.009848669078241425,
  },
  {
    T: 1613138472806,
    USD: 0.009848669078241425,
  },
];

async function getPortfolioChartData(
  timeframe: timeframe,
  exchangeID?: string,
) {
  const Authorization = authHeader().Authorization;
  const requestOptions = {
    Authorization: Authorization,
  };

  return await axios
    .get(`${API_DOMAIN}/portfolios/${timeframe}`, { headers: requestOptions, params: {exchangeID:  exchangeID} })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return data;
    });
}
