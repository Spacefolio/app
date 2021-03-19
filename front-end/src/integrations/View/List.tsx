import React, { useEffect, useState } from 'react';
import { exchangeActions, portfolioActions } from '../../_actions';
import { IExchangeAccountView, IIntegrationInfo } from '../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../_reducers';

import {
	Avatar,
	createStyles,
	Fab,
	ListItemAvatar,
	makeStyles,
	MenuItem,
	TextField,
	Theme,
	Typography,
} from '@material-ui/core';
import { AccountBalanceWallet, Add } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { COLORS } from '../../_styles/ResponsiveDesign';
import { ExchangeItem } from './LineItem';

interface IListMyExchangesProps {
	enableEditing: boolean;
}

export const ListMyExchanges: React.FC<IListMyExchangesProps> = ({
	enableEditing,
}) => {
	useEffect(() => {
		dispatch(exchangeActions.getAll());
		dispatch(exchangeActions.getIntegrationInfo());
	}, []);
	const loadingExchanges = useSelector((state: any) => state.exchanges.loading);

	const userLinkedExchanges: IExchangeAccountView[] = useSelector(
		(state: IRootState) => state.exchanges.exchanges
	);

	const dispatch = useDispatch();

	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			blend: {
				color: COLORS.darkBase,
				backgroundColor: 'white',
				border: `${COLORS.darkBase} solid 2px`,
			},
		})
	);

	return (
		<React.Fragment>
			{userLinkedExchanges.length > 0 ? (
				userLinkedExchanges.map((item: IExchangeAccountView, index: number) => {
					return (
						<ExchangeItem
							enableEditing={enableEditing}
							key={index}
							data={item}
						/>
					);
				})
			) : (
				<React.Fragment>Whoops nothing here doot</React.Fragment>
			)}
		</React.Fragment>
	);
};
