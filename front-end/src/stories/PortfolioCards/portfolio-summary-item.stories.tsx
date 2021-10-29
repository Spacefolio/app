import React from 'react';
import { Story } from '@storybook/react';
import {
	IPortfolioSummaryItemView,
	PortfolioSummaryItem,
} from '../../Portfolio/Summary/Line_item/PortfolioSummaryItem';
import { Provider } from 'react-redux';
import { store } from '../../_helpers';

export default {
	title: 'Design/Portfolio/SummaryCard',
	component: PortfolioSummaryItem,
};

const Template: Story<IPortfolioSummaryItemView> = ({ ...args }) => (
	<Provider store={store}>
		<PortfolioSummaryItem {...args} />
	</Provider>
);

const data = {
  "apiInfo": {
    "apiKey": "e3d122254043721d4d602768bc7963ee",
    "secret": "au2mQvKqG1agmKPUJUOsX5kGTDS5aP909mhttLtPRo1BHQ+YhaO+e5zxzxlJYpFBKapPRTkudHjn3WEoy694xQ==",
    "password": "6gbpx19oaik"
  },
  "exchangeType": "coinbasepro",
  "name": "Coinbase Pro",
  "logoUrl": "https://s2.coinmarketcap.com/static/img/exchanges/64x64/89.png",
  "nickname": "Bad Coins",
  "addedDate": "2021-03-11T04:06:10.218Z",
  "transactionViewItems": [
    {
      "_id": "604997334fcbe220386e413c",
      "exchangeName": "Coinbase Pro",
      "symbol": "USD",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "deposit",
      "date": 1584896745938,
      "amount": 3300,
      "quoteAmount": 3300,
      "price": 1,
      "value": 3300
    },
    {
      "_id": "604997334fcbe220386e413d",
      "exchangeName": "Coinbase Pro",
      "symbol": "ETH",
      "quoteSymbol": "ETH",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "withdrawal",
      "date": 1585361082214,
      "amount": 24.87157654,
      "quoteAmount": 24.87157654,
      "price": 130.2865618875773,
      "value": 3240.432196120326
    },
    {
      "_id": "604997334fcbe220386e413e",
      "exchangeName": "Coinbase Pro",
      "symbol": "ETH",
      "quoteSymbol": "ETH",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "deposit",
      "date": 1587665579890,
      "amount": 22.0982726,
      "quoteAmount": 22.0982726,
      "price": 182.2767576620704,
      "value": 4028.0014794605704
    },
    {
      "_id": "604997334fcbe220386e413f",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "BTC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "deposit",
      "date": 1587734923318,
      "amount": 0.03288775,
      "quoteAmount": 0.03288775,
      "price": 7382.793144116689,
      "value": 242.80345522542365
    },
    {
      "_id": "604997334fcbe220386e4140",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "BTC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "deposit",
      "date": 1588188338675,
      "amount": 0.01919527,
      "quoteAmount": 0.01919527,
      "price": 7758.230255185947,
      "value": 148.92132447046316
    },
    {
      "_id": "604997334fcbe220386e4141",
      "exchangeName": "Coinbase Pro",
      "symbol": "USDC",
      "quoteSymbol": "USDC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "withdrawal",
      "date": 1589294946081,
      "amount": 4699.75,
      "quoteAmount": 4699.75,
      "price": 0.9968589434492247,
      "value": 4684.987819475494
    },
    {
      "_id": "604997334fcbe220386e4142",
      "exchangeName": "Coinbase Pro",
      "symbol": "USDC",
      "quoteSymbol": "USDC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "deposit",
      "date": 1589407109122,
      "amount": 1233.355756,
      "quoteAmount": 1233.355756,
      "price": 0.9984829877834487,
      "value": 1231.484740250794
    },
    {
      "_id": "604997334fcbe220386e4143",
      "exchangeName": "Coinbase Pro",
      "symbol": "USDC",
      "quoteSymbol": "USDC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "withdrawal",
      "date": 1589407225128,
      "amount": 1233.355756,
      "quoteAmount": 1233.355756,
      "price": 0.9984829877834487,
      "value": 1231.484740250794
    },
    {
      "_id": "604997334fcbe220386e4144",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "BTC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "deposit",
      "date": 1592938766659,
      "amount": 0.61089309,
      "quoteAmount": 0.61089309,
      "price": 9678.683208975835,
      "value": 5912.640692662364
    },
    {
      "_id": "604997334fcbe220386e4145",
      "exchangeName": "Coinbase Pro",
      "symbol": "USD",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "withdrawal",
      "date": 1592944198045,
      "amount": 5868.75,
      "quoteAmount": 5868.75,
      "price": 1,
      "value": 5868.75
    },
    {
      "_id": "604997334fcbe220386e4146",
      "exchangeName": "Coinbase Pro",
      "symbol": "USD",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "deposit",
      "date": 1607889350854,
      "amount": 5000,
      "quoteAmount": 5000,
      "price": 1,
      "value": 5000
    },
    {
      "_id": "604997334fcbe220386e4147",
      "exchangeName": "Coinbase Pro",
      "symbol": "USD",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "withdrawal",
      "date": 1608898663475,
      "amount": 1606.2,
      "quoteAmount": 1606.2,
      "price": 1,
      "value": 1606.2
    },
    {
      "_id": "604997334fcbe220386e4148",
      "exchangeName": "Coinbase Pro",
      "symbol": "USD",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "deposit",
      "date": 1609201183926,
      "amount": 1843.16,
      "quoteAmount": 1843.16,
      "price": 1,
      "value": 1843.16
    },
    {
      "_id": "604997334fcbe220386e4149",
      "exchangeName": "Coinbase Pro",
      "symbol": "USD",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "withdrawal",
      "date": 1611613371087,
      "amount": 1190.74,
      "quoteAmount": 1190.74,
      "price": 1,
      "value": 1190.74
    },
    {
      "_id": "604997334fcbe220386e414a",
      "exchangeName": "Coinbase Pro",
      "symbol": "USD",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "withdrawal",
      "date": 1611778873942,
      "amount": 5034.64,
      "quoteAmount": 5034.64,
      "price": 1,
      "value": 5034.64
    },
    {
      "_id": "604997334fcbe220386e414b",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "BTC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "deposit",
      "date": 1614019009058,
      "amount": 0.00022947,
      "quoteAmount": 0.00022947,
      "price": 57669.3035269179,
      "value": 13.233375080321851
    },
    {
      "_id": "604997334fcbe220386e414c",
      "exchangeName": "Coinbase Pro",
      "symbol": "ETH",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1585344964384,
      "amount": 10,
      "quoteAmount": 1365,
      "price": 136.5,
      "value": 1365,
      "fee": {
        "_id": "604997324fcbe220386e3f77",
        "cost": 6.825,
        "currency": "USD",
        "id": "604997324fcbe220386e3f77"
      }
    },
    {
      "_id": "604997334fcbe220386e414e",
      "exchangeName": "Coinbase Pro",
      "symbol": "ETH",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1585360459706,
      "amount": 14.87157654,
      "quoteAmount": 1918.5820894254,
      "price": 129.01,
      "value": 1918.5820894254,
      "fee": {
        "_id": "604997324fcbe220386e3f79",
        "cost": 9.592910447127,
        "currency": "USD",
        "id": "604997324fcbe220386e3f79"
      }
    },
    {
      "_id": "604997334fcbe220386e4150",
      "exchangeName": "Coinbase Pro",
      "symbol": "ETH",
      "quoteSymbol": "BTC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1587666610880,
      "amount": 12,
      "quoteAmount": 0.3012,
      "price": 178.46088180866263,
      "value": 2141.5305817039516,
      "fee": {
        "_id": "604997324fcbe220386e3f7b",
        "cost": 0.001506,
        "currency": "BTC",
        "id": "604997324fcbe220386e3f7b"
      }
    },
    {
      "_id": "604997334fcbe220386e4152",
      "exchangeName": "Coinbase Pro",
      "symbol": "LTC",
      "quoteSymbol": "BTC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1587666708909,
      "amount": 20.80191289,
      "quoteAmount": 0.1194029799886,
      "price": 40.811372971383406,
      "value": 848.954625472018,
      "fee": {
        "_id": "604997324fcbe220386e3f7d",
        "cost": 0.000597014899943,
        "currency": "BTC",
        "id": "604997324fcbe220386e3f7d"
      }
    },
    {
      "_id": "604997334fcbe220386e4154",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1589233602306,
      "amount": 0.23177702,
      "quoteAmount": 1988.302391286,
      "price": 8578.51391516726,
      "value": 1988.302391286,
      "fee": {
        "_id": "604997324fcbe220386e3f7f",
        "cost": 9.94151195643,
        "currency": "USD",
        "id": "604997324fcbe220386e3f7f"
      }
    },
    {
      "_id": "604997334fcbe220386e4156",
      "exchangeName": "Coinbase Pro",
      "symbol": "ETH",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1589233625427,
      "amount": 10.0982726,
      "quoteAmount": 1875.048056368,
      "price": 185.68007922147004,
      "value": 1875.048056368,
      "fee": {
        "_id": "604997324fcbe220386e3f81",
        "cost": 9.37524028184,
        "currency": "USD",
        "id": "604997324fcbe220386e3f81"
      }
    },
    {
      "_id": "604997334fcbe220386e4158",
      "exchangeName": "Coinbase Pro",
      "symbol": "LTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1589233631218,
      "amount": 20.80191289,
      "quoteAmount": 860.0240788726,
      "price": 41.34350929264948,
      "value": 860.0240788726,
      "fee": {
        "_id": "604997324fcbe220386e3f83",
        "cost": 4.300120394363,
        "currency": "USD",
        "id": "604997324fcbe220386e3f83"
      }
    },
    {
      "_id": "604997334fcbe220386e415a",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1592944125152,
      "amount": 0.61089309,
      "quoteAmount": 5898.2339197765,
      "price": 9655.100076146711,
      "value": 5898.2339197765,
      "fee": {
        "_id": "604997324fcbe220386e3f85",
        "cost": 29.4911695988825,
        "currency": "USD",
        "id": "604997324fcbe220386e3f85"
      }
    },
    {
      "_id": "604997334fcbe220386e415c",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1607992359754,
      "amount": 0.05150821,
      "quoteAmount": 995.0247840559,
      "price": 19317.79,
      "value": 995.0247840559,
      "fee": {
        "_id": "604997324fcbe220386e3f87",
        "cost": 4.9751239202795,
        "currency": "USD",
        "id": "604997324fcbe220386e3f87"
      }
    },
    {
      "_id": "604997334fcbe220386e415e",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1607997917360,
      "amount": 0.02550038,
      "quoteAmount": 497.5124138,
      "price": 19510,
      "value": 497.5124138,
      "fee": {
        "_id": "604997324fcbe220386e3f89",
        "cost": 2.487562069,
        "currency": "USD",
        "id": "604997324fcbe220386e3f89"
      }
    },
    {
      "_id": "604997334fcbe220386e4160",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608043782645,
      "amount": 422.246923,
      "quoteAmount": 199.0049748099,
      "price": 0.47130000000000005,
      "value": 199.0049748099,
      "fee": {
        "_id": "604997324fcbe220386e3f8b",
        "cost": 0.9950248740495,
        "currency": "USD",
        "id": "604997324fcbe220386e3f8b"
      }
    },
    {
      "_id": "604997334fcbe220386e4162",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608098962663,
      "amount": 439.69283,
      "quoteAmount": 199.004974858,
      "price": 0.4526,
      "value": 199.004974858,
      "fee": {
        "_id": "604997324fcbe220386e3f8d",
        "cost": 0.99502487429,
        "currency": "USD",
        "id": "604997324fcbe220386e3f8d"
      }
    },
    {
      "_id": "604997334fcbe220386e4164",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608136767637,
      "amount": 861.939753,
      "quoteAmount": 453.9836679051,
      "price": 0.5267,
      "value": 453.9836679051,
      "fee": {
        "_id": "604997324fcbe220386e3f8f",
        "cost": 2.2699183395255,
        "currency": "USD",
        "id": "604997324fcbe220386e3f8f"
      }
    },
    {
      "_id": "604997334fcbe220386e4166",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608227409845,
      "amount": 0.15027532,
      "quoteAmount": 3534.039727972,
      "price": 23517.100000000002,
      "value": 3534.039727972,
      "fee": {
        "_id": "604997324fcbe220386e3f91",
        "cost": 17.67019863986,
        "currency": "USD",
        "id": "604997324fcbe220386e3f91"
      }
    },
    {
      "_id": "604997334fcbe220386e4168",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608228701557,
      "amount": 0.22728391,
      "quoteAmount": 5256.4138803515,
      "price": 23127.08312854834,
      "value": 5256.4138803515,
      "fee": {
        "_id": "604997324fcbe220386e3f93",
        "cost": 26.2820694017575,
        "currency": "USD",
        "id": "604997324fcbe220386e3f93"
      }
    },
    {
      "_id": "604997334fcbe220386e416a",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608229169149,
      "amount": 0.10949302,
      "quoteAmount": 2487.5620670082,
      "price": 22718.91,
      "value": 2487.5620670082,
      "fee": {
        "_id": "604997324fcbe220386e3f95",
        "cost": 12.437810335041,
        "currency": "USD",
        "id": "604997324fcbe220386e3f95"
      }
    },
    {
      "_id": "604997334fcbe220386e416c",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608229870619,
      "amount": 0.10949302,
      "quoteAmount": 2505.41928364,
      "price": 22882,
      "value": 2505.41928364,
      "fee": {
        "_id": "604997324fcbe220386e3f97",
        "cost": 12.5270964182,
        "currency": "USD",
        "id": "604997324fcbe220386e3f97"
      }
    },
    {
      "_id": "604997334fcbe220386e416e",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608589986766,
      "amount": 2468.607296,
      "quoteAmount": 1301.2029057216,
      "price": 0.5271,
      "value": 1301.2029057216,
      "fee": {
        "_id": "604997324fcbe220386e3f99",
        "cost": 4.5542101700256,
        "currency": "USD",
        "id": "604997324fcbe220386e3f99"
      }
    },
    {
      "_id": "604997334fcbe220386e4170",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608591159386,
      "amount": 0.08432285,
      "quoteAmount": 1951.80414438,
      "price": 23146.8,
      "value": 1951.80414438,
      "fee": {
        "_id": "604997324fcbe220386e3f9b",
        "cost": 6.83131450533,
        "currency": "USD",
        "id": "604997324fcbe220386e3f9b"
      }
    },
    {
      "_id": "604997334fcbe220386e4172",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608660861599,
      "amount": 1058.767751,
      "quoteAmount": 498.2561036206,
      "price": 0.47059999999999996,
      "value": 498.2561036206,
      "fee": {
        "_id": "604997324fcbe220386e3f9d",
        "cost": 1.7438963626721,
        "currency": "USD",
        "id": "604997324fcbe220386e3f9d"
      }
    },
    {
      "_id": "604997334fcbe220386e4174",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608661474138,
      "amount": 3527.375047,
      "quoteAmount": 1658.9937077557,
      "price": 0.4703196245510266,
      "value": 1658.9937077557,
      "fee": {
        "_id": "604997324fcbe220386e3f9f",
        "cost": 5.80647797714495,
        "currency": "USD",
        "id": "604997324fcbe220386e3f9f"
      }
    },
    {
      "_id": "604997334fcbe220386e4176",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608674438756,
      "amount": 1166.505934,
      "quoteAmount": 498.2561035303,
      "price": 0.4271355069937432,
      "value": 498.2561035303,
      "fee": {
        "_id": "604997324fcbe220386e3fa1",
        "cost": 1.74389636235605,
        "currency": "USD",
        "id": "604997324fcbe220386e3fa1"
      }
    },
    {
      "_id": "604997334fcbe220386e4178",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608698476407,
      "amount": 1166.505934,
      "quoteAmount": 454.2607601062,
      "price": 0.38942001653478087,
      "value": 454.2607601062,
      "fee": {
        "_id": "604997324fcbe220386e3fa3",
        "cost": 1.5899126603717,
        "currency": "USD",
        "id": "604997324fcbe220386e3fa3"
      }
    },
    {
      "_id": "604997334fcbe220386e417a",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608701383872,
      "amount": 2748.241057,
      "quoteAmount": 996.5122072682,
      "price": 0.3626,
      "value": 996.5122072682,
      "fee": {
        "_id": "604997324fcbe220386e3fa5",
        "cost": 3.4877927254387,
        "currency": "USD",
        "id": "604997324fcbe220386e3fa5"
      }
    },
    {
      "_id": "604997334fcbe220386e417c",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608701682006,
      "amount": 1430.537191,
      "quoteAmount": 498.2561036253,
      "price": 0.3483,
      "value": 498.2561036253,
      "fee": {
        "_id": "604997324fcbe220386e3fa7",
        "cost": 1.74389636268855,
        "currency": "USD",
        "id": "604997324fcbe220386e3fa7"
      }
    },
    {
      "_id": "604997334fcbe220386e417e",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608702282095,
      "amount": 1429.306091,
      "quoteAmount": 498.2561033226,
      "price": 0.3486,
      "value": 498.2561033226,
      "fee": {
        "_id": "604997324fcbe220386e3fa9",
        "cost": 1.7438963616291,
        "currency": "USD",
        "id": "604997324fcbe220386e3fa9"
      }
    },
    {
      "_id": "604997334fcbe220386e4180",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608702955901,
      "amount": 5608.084339,
      "quoteAmount": 2037.9778487926,
      "price": 0.3634,
      "value": 2037.9778487926,
      "fee": {
        "_id": "604997324fcbe220386e3fab",
        "cost": 7.1329224707741,
        "currency": "USD",
        "id": "604997324fcbe220386e3fab"
      }
    },
    {
      "_id": "604997334fcbe220386e4182",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608705396148,
      "amount": 3000,
      "quoteAmount": 993,
      "price": 0.331,
      "value": 993,
      "fee": {
        "_id": "604997324fcbe220386e3fad",
        "cost": 3.4755,
        "currency": "USD",
        "id": "604997324fcbe220386e3fad"
      }
    },
    {
      "_id": "604997334fcbe220386e4184",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608705414945,
      "amount": 2000,
      "quoteAmount": 642,
      "price": 0.321,
      "value": 642,
      "fee": {
        "_id": "604997324fcbe220386e3faf",
        "cost": 2.247,
        "currency": "USD",
        "id": "604997324fcbe220386e3faf"
      }
    },
    {
      "_id": "604997334fcbe220386e4186",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608705504759,
      "amount": 2000,
      "quoteAmount": 622,
      "price": 0.311,
      "value": 622,
      "fee": {
        "_id": "604997324fcbe220386e3fb1",
        "cost": 2.177,
        "currency": "USD",
        "id": "604997324fcbe220386e3fb1"
      }
    },
    {
      "_id": "604997334fcbe220386e4188",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608705512506,
      "amount": 2748.399181,
      "quoteAmount": 827.5429933991,
      "price": 0.3011,
      "value": 827.5429933991,
      "fee": {
        "_id": "604997324fcbe220386e3fb3",
        "cost": 2.89640047689685,
        "currency": "USD",
        "id": "604997324fcbe220386e3fb3"
      }
    },
    {
      "_id": "604997334fcbe220386e418a",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "BTC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608742582668,
      "amount": 1524,
      "quoteAmount": 0.01992785,
      "price": 0.31114112317308873,
      "value": 474.17907171578725,
      "fee": {
        "_id": "604997324fcbe220386e3fb5",
        "cost": 0.000069747475,
        "currency": "BTC",
        "id": "604997324fcbe220386e3fb5"
      }
    },
    {
      "_id": "604997334fcbe220386e418c",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608747757856,
      "amount": 2748,
      "quoteAmount": 875.2276303916,
      "price": 0.3184962264889374,
      "value": 875.2276303916,
      "fee": {
        "_id": "604997324fcbe220386e3fb7",
        "cost": 3.0632967063706,
        "currency": "USD",
        "id": "604997324fcbe220386e3fb7"
      }
    },
    {
      "_id": "604997334fcbe220386e418e",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608751598758,
      "amount": 0.06432525,
      "quoteAmount": 1511.8717753291,
      "price": 23503.550710321375,
      "value": 1511.8717753291,
      "fee": {
        "_id": "604997324fcbe220386e3fb9",
        "cost": 5.29155121365185,
        "currency": "USD",
        "id": "604997324fcbe220386e3fb9"
      }
    },
    {
      "_id": "604997334fcbe220386e4190",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608756335295,
      "amount": 1040.612958,
      "quoteAmount": 298.9536620516,
      "price": 0.28728612281185917,
      "value": 298.9536620516,
      "fee": {
        "_id": "604997324fcbe220386e3fbb",
        "cost": 1.0463378171806,
        "currency": "USD",
        "id": "604997324fcbe220386e3fbb"
      }
    },
    {
      "_id": "604997334fcbe220386e4192",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608756527856,
      "amount": 725.791847,
      "quoteAmount": 199.3024411862,
      "price": 0.2746,
      "value": 199.3024411862,
      "fee": {
        "_id": "604997324fcbe220386e3fbd",
        "cost": 0.6975585441517,
        "currency": "USD",
        "id": "604997324fcbe220386e3fbd"
      }
    },
    {
      "_id": "604997334fcbe220386e4194",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608756621651,
      "amount": 751.800986,
      "quoteAmount": 199.3024413886,
      "price": 0.2651,
      "value": 199.3024413886,
      "fee": {
        "_id": "604997324fcbe220386e3fbf",
        "cost": 0.6975585448601,
        "currency": "USD",
        "id": "604997324fcbe220386e3fbf"
      }
    },
    {
      "_id": "604997334fcbe220386e4196",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608756661123,
      "amount": 780.048694,
      "quoteAmount": 199.302441317,
      "price": 0.2555,
      "value": 199.302441317,
      "fee": {
        "_id": "604997324fcbe220386e3fc1",
        "cost": 0.6975585446095,
        "currency": "USD",
        "id": "604997324fcbe220386e3fc1"
      }
    },
    {
      "_id": "604997334fcbe220386e4198",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608756691461,
      "amount": 764.378557,
      "quoteAmount": 199.3024412327,
      "price": 0.2607378757652669,
      "value": 199.3024412327,
      "fee": {
        "_id": "604997324fcbe220386e3fc3",
        "cost": 0.69755854431445,
        "currency": "USD",
        "id": "604997324fcbe220386e3fc3"
      }
    },
    {
      "_id": "604997334fcbe220386e419a",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608756813825,
      "amount": 764,
      "quoteAmount": 203.606,
      "price": 0.2665,
      "value": 203.606,
      "fee": {
        "_id": "604997324fcbe220386e3fc5",
        "cost": 0.712621,
        "currency": "USD",
        "id": "604997324fcbe220386e3fc5"
      }
    },
    {
      "_id": "604997334fcbe220386e419c",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608756958403,
      "amount": 780,
      "quoteAmount": 211.138,
      "price": 0.27068974358974357,
      "value": 211.138,
      "fee": {
        "_id": "604997324fcbe220386e3fc7",
        "cost": 0.738983,
        "currency": "USD",
        "id": "604997324fcbe220386e3fc7"
      }
    },
    {
      "_id": "604997334fcbe220386e419e",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608761426435,
      "amount": 817.483352,
      "quoteAmount": 199.3024412176,
      "price": 0.24380000000000002,
      "value": 199.3024412176,
      "fee": {
        "_id": "604997324fcbe220386e3fc9",
        "cost": 0.6975585442616,
        "currency": "USD",
        "id": "604997324fcbe220386e3fc9"
      }
    },
    {
      "_id": "604997344fcbe220386e41a0",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608761446526,
      "amount": 1651.221553,
      "quoteAmount": 398.6048828942,
      "price": 0.24139999999999998,
      "value": 398.6048828942,
      "fee": {
        "_id": "604997324fcbe220386e3fcb",
        "cost": 1.3951170901297,
        "currency": "USD",
        "id": "604997324fcbe220386e3fcb"
      }
    },
    {
      "_id": "604997344fcbe220386e41a2",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608761579430,
      "amount": 1267.827235,
      "quoteAmount": 298.953662013,
      "price": 0.23579999999999998,
      "value": 298.953662013,
      "fee": {
        "_id": "604997324fcbe220386e3fcd",
        "cost": 1.0463378170455,
        "currency": "USD",
        "id": "604997324fcbe220386e3fcd"
      }
    },
    {
      "_id": "604997344fcbe220386e41a4",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608761653884,
      "amount": 865.027957,
      "quoteAmount": 199.3024412928,
      "price": 0.23040000000000002,
      "value": 199.3024412928,
      "fee": {
        "_id": "604997324fcbe220386e3fcf",
        "cost": 0.6975585445248,
        "currency": "USD",
        "id": "604997324fcbe220386e3fcf"
      }
    },
    {
      "_id": "604997344fcbe220386e41a6",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608761671160,
      "amount": 874.133515,
      "quoteAmount": 199.30244142,
      "price": 0.228,
      "value": 199.30244142,
      "fee": {
        "_id": "604997324fcbe220386e3fd1",
        "cost": 0.69755854497,
        "currency": "USD",
        "id": "604997324fcbe220386e3fd1"
      }
    },
    {
      "_id": "604997344fcbe220386e41a8",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608761679170,
      "amount": 442.697559,
      "quoteAmount": 99.6512205309,
      "price": 0.2251,
      "value": 99.6512205309,
      "fee": {
        "_id": "604997324fcbe220386e3fd3",
        "cost": 0.34877927185815,
        "currency": "USD",
        "id": "604997324fcbe220386e3fd3"
      }
    },
    {
      "_id": "604997344fcbe220386e41aa",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608762275986,
      "amount": 1347.30711,
      "quoteAmount": 291.01833576,
      "price": 0.21600000000000003,
      "value": 291.01833576,
      "fee": {
        "_id": "604997324fcbe220386e3fd5",
        "cost": 1.01856417516,
        "currency": "USD",
        "id": "604997324fcbe220386e3fd5"
      }
    },
    {
      "_id": "604997344fcbe220386e41ac",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608763506152,
      "amount": 8308,
      "quoteAmount": 2497.62,
      "price": 0.3006283100625903,
      "value": 2497.62,
      "fee": {
        "_id": "604997324fcbe220386e3fd7",
        "cost": 8.74167,
        "currency": "USD",
        "id": "604997324fcbe220386e3fd7"
      }
    },
    {
      "_id": "604997344fcbe220386e41ae",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608763567504,
      "amount": 3576.647286,
      "quoteAmount": 996.5122072006,
      "price": 0.27861629272230115,
      "value": 996.5122072006,
      "fee": {
        "_id": "604997324fcbe220386e3fd9",
        "cost": 3.4877927252021,
        "currency": "USD",
        "id": "604997324fcbe220386e3fd9"
      }
    },
    {
      "_id": "604997344fcbe220386e41b0",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608764025144,
      "amount": 13577.37779,
      "quoteAmount": 3583.069998781,
      "price": 0.26389999999999997,
      "value": 3583.069998781,
      "fee": {
        "_id": "604997324fcbe220386e3fdb",
        "cost": 12.5407449957335,
        "currency": "USD",
        "id": "604997324fcbe220386e3fdb"
      }
    },
    {
      "_id": "604997344fcbe220386e41b2",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608764487960,
      "amount": 18469.14512,
      "quoteAmount": 5041.7614347743,
      "price": 0.2729829346196777,
      "value": 5041.7614347743,
      "fee": {
        "_id": "604997324fcbe220386e3fdd",
        "cost": 17.64616502171005,
        "currency": "USD",
        "id": "604997324fcbe220386e3fdd"
      }
    },
    {
      "_id": "604997344fcbe220386e41b4",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608767215752,
      "amount": 9200,
      "quoteAmount": 2401.5639,
      "price": 0.2610395543478261,
      "value": 2401.5639,
      "fee": {
        "_id": "604997324fcbe220386e3fdf",
        "cost": 8.40547365,
        "currency": "USD",
        "id": "604997324fcbe220386e3fdf"
      }
    },
    {
      "_id": "604997344fcbe220386e41b6",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608772461074,
      "amount": 2000,
      "quoteAmount": 482,
      "price": 0.241,
      "value": 482,
      "fee": {
        "_id": "604997324fcbe220386e3fe1",
        "cost": 0.723,
        "currency": "USD",
        "id": "604997324fcbe220386e3fe1"
      }
    },
    {
      "_id": "604997344fcbe220386e41b8",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608794128138,
      "amount": 2000,
      "quoteAmount": 514.4,
      "price": 0.2572,
      "value": 514.4,
      "fee": {
        "_id": "604997324fcbe220386e3fe3",
        "cost": 1.286,
        "currency": "USD",
        "id": "604997324fcbe220386e3fe3"
      }
    },
    {
      "_id": "604997344fcbe220386e41ba",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608825432835,
      "amount": 3006.288482,
      "quoteAmount": 815.3054363184,
      "price": 0.2712,
      "value": 815.3054363184,
      "fee": {
        "_id": "604997324fcbe220386e3fe5",
        "cost": 2.038263590796,
        "currency": "USD",
        "id": "604997324fcbe220386e3fe5"
      }
    },
    {
      "_id": "604997344fcbe220386e41bc",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1608969319047,
      "amount": 12275.433602,
      "quoteAmount": 3749.8717356745,
      "price": 0.3054777417445804,
      "value": 3749.8717356745,
      "fee": {
        "_id": "604997324fcbe220386e3fe7",
        "cost": 9.37467933918625,
        "currency": "USD",
        "id": "604997324fcbe220386e3fe7"
      }
    },
    {
      "_id": "604997344fcbe220386e41be",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608970042215,
      "amount": 4000,
      "quoteAmount": 1084,
      "price": 0.271,
      "value": 1084,
      "fee": {
        "_id": "604997324fcbe220386e3fe9",
        "cost": 1.626,
        "currency": "USD",
        "id": "604997324fcbe220386e3fe9"
      }
    },
    {
      "_id": "604997344fcbe220386e41c0",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1608970058288,
      "amount": 5000,
      "quoteAmount": 1255,
      "price": 0.251,
      "value": 1255,
      "fee": {
        "_id": "604997324fcbe220386e3feb",
        "cost": 1.8825,
        "currency": "USD",
        "id": "604997324fcbe220386e3feb"
      }
    },
    {
      "_id": "604997344fcbe220386e41c2",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1609203239828,
      "amount": 9000,
      "quoteAmount": 2061.9,
      "price": 0.2291,
      "value": 2061.9,
      "fee": {
        "_id": "604997324fcbe220386e3fed",
        "cost": 3.09285,
        "currency": "USD",
        "id": "604997324fcbe220386e3fed"
      }
    },
    {
      "_id": "604997344fcbe220386e41c4",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1609203429269,
      "amount": 0.19734481,
      "quoteAmount": 5286.7431326697,
      "price": 26789.369999999995,
      "value": 5286.7431326697,
      "fee": {
        "_id": "604997324fcbe220386e3fef",
        "cost": 13.21685783167425,
        "currency": "USD",
        "id": "604997324fcbe220386e3fef"
      }
    },
    {
      "_id": "604997344fcbe220386e41c6",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1609206034317,
      "amount": 0.1,
      "quoteAmount": 2699.9,
      "price": 26999,
      "value": 2699.9,
      "fee": {
        "_id": "604997324fcbe220386e3ff1",
        "cost": 4.04985,
        "currency": "USD",
        "id": "604997324fcbe220386e3ff1"
      }
    },
    {
      "_id": "604997344fcbe220386e41c8",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1609273658104,
      "amount": 0.10009835,
      "quoteAmount": 2689.1271579975,
      "price": 26864.85,
      "value": 2689.1271579975,
      "fee": {
        "_id": "604997324fcbe220386e3ff3",
        "cost": 6.72281789499375,
        "currency": "USD",
        "id": "604997324fcbe220386e3ff3"
      }
    },
    {
      "_id": "604997344fcbe220386e41ca",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "BTC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1610218389677,
      "amount": 310,
      "quoteAmount": 0.0024645,
      "price": 0.32448689674552117,
      "value": 1622.4344837276058,
      "fee": {
        "_id": "604997324fcbe220386e3ff5",
        "cost": 0.00000369675,
        "currency": "BTC",
        "id": "604997324fcbe220386e3ff5"
      }
    },
    {
      "_id": "604997344fcbe220386e41cc",
      "exchangeName": "Coinbase Pro",
      "symbol": "XRP",
      "quoteSymbol": "BTC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1610593831325,
      "amount": 310,
      "quoteAmount": 0.0024149,
      "price": 0.2917823001815392,
      "value": 90.45251305627716,
      "fee": {
        "_id": "604997324fcbe220386e3ff7",
        "cost": 0.00000362235,
        "currency": "BTC",
        "id": "604997324fcbe220386e3ff7"
      }
    },
    {
      "_id": "604997344fcbe220386e41ce",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1611613318396,
      "amount": 0.037,
      "quoteAmount": 1194.92462,
      "price": 32295.260000000002,
      "value": 1194.92462,
      "fee": {
        "_id": "604997324fcbe220386e3ff9",
        "cost": 4.18223617,
        "currency": "USD",
        "id": "604997324fcbe220386e3ff9"
      }
    },
    {
      "_id": "604997344fcbe220386e41d0",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1611778828102,
      "amount": 0.16038624,
      "quoteAmount": 5052.3285501024,
      "price": 31501.01,
      "value": 5052.3285501024,
      "fee": {
        "_id": "604997324fcbe220386e3ffb",
        "cost": 17.6831499253584,
        "currency": "USD",
        "id": "604997324fcbe220386e3ffb"
      }
    },
    {
      "_id": "604997344fcbe220386e41d2",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "sell",
      "date": 1614019045110,
      "amount": 0.00022947,
      "quoteAmount": 12.62085,
      "price": 55000,
      "value": 12.62085,
      "fee": {
        "_id": "604997324fcbe220386e3ffd",
        "cost": 0.06310425,
        "currency": "USD",
        "id": "604997324fcbe220386e3ffd"
      }
    },
    {
      "_id": "604997344fcbe220386e41d4",
      "exchangeName": "Coinbase Pro",
      "symbol": "BTC",
      "quoteSymbol": "USD",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1614223655990,
      "amount": 0.00024834,
      "quoteAmount": 12.4973578572,
      "price": 50323.58,
      "value": 12.4973578572,
      "fee": {
        "_id": "604997324fcbe220386e3fff",
        "cost": 0.062486789286,
        "currency": "USD",
        "id": "604997324fcbe220386e3fff"
      }
    },
    {
      "_id": "604997344fcbe220386e41d6",
      "exchangeName": "Coinbase Pro",
      "symbol": "ETH",
      "quoteSymbol": "BTC",
      "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "type": "buy",
      "date": 1614406196885,
      "amount": 0.00784485,
      "quoteAmount": 0.000247112775,
      "price": 1466.3718555177738,
      "value": 11.503467250758609,
      "fee": {
        "_id": "604997324fcbe220386e4001",
        "cost": 0.000001235563875,
        "currency": "BTC",
        "id": "604997324fcbe220386e4001"
      }
    },
    {
      "_id": "604d96220496523448ed6200",
      "exchangeName": "Coinbase Pro",
      "symbol": "ETH",
      "quoteSymbol": "USD",
      "logoUrl": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
      "type": "sell",
      "date": 1615697415742,
      "amount": 0.002,
      "quoteAmount": 3.80828,
      "price": 1904.1399999999999,
      "value": 3.80828,
      "fee": {
        "_id": "604d96220496523448ed6143",
        "cost": 0.0190414,
        "currency": "USD",
        "id": "604d96220496523448ed6143"
      }
    },
    {
      "_id": "604d96220496523448ed6202",
      "exchangeName": "Coinbase Pro",
      "symbol": "ETH",
      "quoteSymbol": "BTC",
      "logoUrl": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
      "type": "sell",
      "date": 1615697436346,
      "amount": 0.003,
      "quoteAmount": 0.00009327,
      "price": 0.031090000000000003,
      "value": 0.00009327,
      "fee": {
        "_id": "604d96220496523448ed6145",
        "cost": 4.6635e-7,
        "currency": "BTC",
        "id": "604d96220496523448ed6145"
      }
    }
  ],
  "id": "604997324fcbe220386e3f55",
  "portfolioItems": [
    {
      "asset": {
        "_id": "604ef7a318f6893b3098e4f8",
        "assetId": "BTC",
        "symbol": "BTC",
        "name": "BTC",
        "logoUrl": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        "id": "604ef7a318f6893b3098e4f8"
      },
      "amount": 0.000092803847582,
      "value": {
        "USD": 5.201284441580772
      },
      "profitTotal": {
        "all": 1382.6359252277039,
        "h24": 169
      },
      "currentPrice": 56046,
      "profitPercentage": {
        "all": 5.303898162540677,
        "h24": 450
      }
    },
    {
      "asset": {
        "_id": "604ef7a318f6893b3098e517",
        "assetId": "ETH",
        "symbol": "ETH",
        "name": "ETH",
        "logoUrl": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        "id": "604ef7a318f6893b3098e517"
      },
      "amount": 0.00284485,
      "value": {
        "USD": 5.050063926
      },
      "profitTotal": {
        "all": -93.7951275885415,
        "h24": 386
      },
      "currentPrice": 1775.16,
      "profitPercentage": {
        "all": -1.2779389513969053,
        "h24": 401
      }
    },
    {
      "asset": {
        "_id": "604ef7a318f6893b3098e523",
        "assetId": "LTC",
        "symbol": "LTC",
        "name": "LTC",
        "logoUrl": "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580",
        "id": "604ef7a318f6893b3098e523"
      },
      "amount": 0,
      "value": {
        "USD": 0
      },
      "profitTotal": {
        "all": 2.5245598788586676,
        "h24": -295
      },
      "currentPrice": 200.78,
      "profitPercentage": {
        "all": 0.29589330266793595,
        "h24": -294
      }
    },
    {
      "asset": {
        "_id": "604ef7a318f6893b3098e528",
        "assetId": "USD",
        "symbol": "USD",
        "name": "USD",
        "logoUrl": "https://assets.coingecko.com/coins/images/12259/large/Uniswap_State_Dollar.png?1598550804",
        "id": "604ef7a318f6893b3098e528"
      },
      "amount": 3.79657974039795,
      "value": {
        "USD": 3.79657974039795
      },
      "profitTotal": {
        "all": -5033.479079473027,
        "h24": -480
      },
      "currentPrice": 1,
      "profitPercentage": {
        "all": -8.430487706186906,
        "h24": -125
      }
    },
    {
      "asset": {
        "_id": "604ef7a318f6893b3098e573",
        "assetId": "USDC",
        "symbol": "USDC",
        "name": "USDC",
        "logoUrl": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
        "id": "604ef7a318f6893b3098e573"
      },
      "amount": 0,
      "value": {
        "USD": 0
      },
      "profitTotal": {
        "all": 4684.987819475494,
        "h24": 383
      },
      "currentPrice": 1,
      "profitPercentage": {
        "all": 380.43409441853,
        "h24": 247
      }
    },
    {
      "asset": {
        "_id": "604ef7a318f6893b3098e579",
        "assetId": "XRP",
        "symbol": "XRP",
        "name": "XRP",
        "logoUrl": "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
        "id": "604ef7a318f6893b3098e579"
      },
      "amount": 0,
      "value": {
        "USD": 0
      },
      "profitTotal": {
        "all": -142.5216959549216,
        "h24": 267
      },
      "currentPrice": 0.439534,
      "profitPercentage": {
        "all": -0.682846733623015,
        "h24": -375
      }
    }
  ],
  "profitPercentage": -99.29835360571082,
  "portfolioTotal": {
    "USD": 14.047928107978722
  },
  "profitTotal": {
    "USD": 800.3524015655662
  },
  "openOrders": [],
  "lastRefresh": 1615830647667
};

export const Main = Template.bind({});
Main.args = {
	portfolioItem: data,
};

