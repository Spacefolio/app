import { Avatar, ThemeProvider, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import { ITransactionItemView } from "../../../../../types";
import { FlexCard, FlexCardHeader, InlineDiv } from "../../../_styles";
import { theme } from '../../../_styles/Theme';


interface ITransactionsProps {
	transactions: ITransactionItemView[];
}

export const Transactions: React.FC<ITransactionsProps> = ({
	transactions,
}) => {
	const rows = transactions.map((item, index: number) => {
		return {
			id: index,
			symbol: [item.logoUrl, ` ${item.symbol}` + ((item.quoteSymbol != '') ? `/${item.quoteSymbol}` : '')],
			date: new Date(item.date),
			amount: item.amount.toLocaleString(),
			action: item.type.toLocaleUpperCase(),
			fee: item.fee.cost,
			price: item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
			value: (item.price * item.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
		};
	});

	const columns = [
		{
			field: 'symbol',
			headerName: 'Asset/Pair',
			width: 160,
			renderCell: (params: any) => (
				<InlineDiv>
					<Avatar sizes="small" src={params.value[0]} />
					<Typography style={{ marginLeft: 12 }}>{params.value[1]}</Typography>
				</InlineDiv>
			),
		},
		{ field: 'action', headerName: 'Action', width: 120 },
		{ field: 'amount', type: 'number', headerName: 'Amount', width: 100 },
		{ field: 'price', type: 'number', headerName: 'Price', width: 100 },
		{ field: 'value', type: 'number', headerName: 'Value', width: 100 },
		{ field: 'date', headerName: 'Date', width: 200 },
		{ field: 'fee', type: 'number', headerName: 'Fee', width: 100 }
	];

	/*
	return (
		<React.Fragment>
			<div style={{ height: '500px', width: '100%' }}>
				<DataGrid headerHeight={30} rows={rows} columns={columns} />
			</div>
		</React.Fragment>
	);
	*/

	return (
		<ThemeProvider theme={theme}>
			<FlexCard style={{ gridArea: 'transactions' }} disableGutters>
				<FlexCardHeader
					style={{
						height: '60px',
						borderBottom: '1px solid rgb(236, 239, 241)',
					}}
				>
					<Typography gutterBottom variant="h3">
						Transactions
					</Typography>
				</FlexCardHeader>
				<React.Fragment>
					<div style={{ height: '400px', width: '100%' }}>
						<DataGrid headerHeight={30} rows={rows} columns={columns} />
					</div>
				</React.Fragment>
			</FlexCard>
		</ThemeProvider>
	)
};
