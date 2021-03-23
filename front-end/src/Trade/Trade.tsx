import { List, ListItem, Menu, MenuItem } from '@material-ui/core';
import { dispatch } from 'd3-dispatch';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exchangeActions } from '../_actions';
import { useFilteredPortfolio } from '../_hooks/useFilteredPortfolio';
import { IRootState } from '../_reducers';
const ccxt = require('ccxt');
const ccxtpro = require('ccxt.pro');
const asciichart = require('asciichart');
const asTable = require('as-table');
const log = require('ololog').configure({ locate: false });

require('ansicolor').nice;

interface TradeProps {}

export const Trade: React.FC<TradeProps> = ({}) => {
	const dispatch = useDispatch();

	const [exchangePairs, setExchangePairs] = useState();

	const [selectedPair, setSelectedPair] = useState();

	const integrations = useSelector(
		(state: IRootState) => state.exchanges.exchanges
	);

	const [filterId, setFilterId] = useState('');

	const filteredPortfolio = useFilteredPortfolio(filterId);

	const [feed, setFeed] = useState([]);

	useEffect(() => {
		dispatch(exchangeActions.getAll());
	}, []);

	useEffect(() => {
		integrations.length > 0 && setFilterId(integrations[0].id);
	}, [integrations]);

	async function getTradablePairs(filterId: string) {
		let exchange = new ccxt[filteredPortfolio.exchangeType]();
		let markets = await exchange.fetchMarkets();
		return markets;
	}

	useEffect(() => {
		if (filterId) {
			getTradablePairs(filterId).then((res) => {
				console.log(res);
				setExchangePairs(res);
			});
		}
	}, [filterId]);

	async function doStuff() {
		const index = 4; // [ timestamp, open, high, low, close, volume ]
		const ohlcv = await new ccxt[filteredPortfolio.exchangeType].fetchOHLCV(
			selectedPair.symbol,
			'15m'
		);
		const lastPrice = ohlcv[ohlcv.length - 1][index]; // closing price
		const series = ohlcv.map((x) => x[index]); // closing price
		const bitcoinRate = '₿ = $' + lastPrice;
		const chart = asciichart.plot(series, {
			height: 15,
			padding: '            ',
		});
		log.yellow('\n' + chart, bitcoinRate, '\n');
		process.exit();
	}

	useEffect(() => {
		if (selectedPair) {
			doStuff();
		}
	}, [selectedPair]);

	return (
		<div style={{ display: 'flex' }}>
			{integrations.length > 0 ? (
				<React.Fragment>
					<List>
						{integrations.map((item, index) => {
							return (
								<ListItem onClick={() => setFilterId(item.id)} key={index}>
									{item.nickname}
								</ListItem>
							);
						})}
					</List>
					{exchangePairs ? (
						<List>
							{exchangePairs.map((item: any, index: any) => {
								return (
									<ListItem onClick={() => setSelectedPair(item)} key={index}>
										{item.id}
									</ListItem>
								);
							})}
						</List>
					) : null}
					<div>{selectedPair && selectedPair.id}</div>
					<div
						style={{ display: 'flex', flexDirection: 'column' }}
						id="list"
					></div>
				</React.Fragment>
			) : null}
		</div>
	);
};
