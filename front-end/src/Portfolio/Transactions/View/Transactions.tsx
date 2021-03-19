import React from 'react';
import { IPortfolioDataView, ITransactionItemView } from '../../../../../types';
import { TransactionItem } from './TransactionItem';
import { DataGrid, GridCellParams } from '@material-ui/data-grid';
import { Avatar, Typography } from '@material-ui/core';
import { InlineDiv } from '../../../_styles';

interface ITransactionsProps {
	transactions: ITransactionItemView[];
}

export const Transactions: React.FC<ITransactionsProps> = ({
	transactions,
}) => {
	const rows = transactions.map((item, index: number) => {
		return {
			id: index,
			symbol: [item.logoUrl, item.symbol],
			date: new Date(item.date),
			amount: item.amount,
		};
	});

	const columns = [
		{
			field: 'symbol',
			headerName: 'symbol',
			renderCell: (params: any) => (
				<InlineDiv>
					<Avatar sizes="small" src={params.value[0]} />
					<Typography>{params.value[1]}</Typography>
				</InlineDiv>
			),
		},
		{ field: 'date', headerName: 'date', width: 150 },
		{ field: 'amount', headerName: 'amount', width: 150 },
	];

	return (
		<React.Fragment>
			<div style={{ height: '300px', width: '100%' }}>
				<DataGrid rows={rows} columns={columns} />
			</div>
		</React.Fragment>
	);
};
